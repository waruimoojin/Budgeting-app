// depend upon how many things u need
const User = require("../models/usersModel.js") // 1 min okay bro
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// it is standard to captilize Model Name
const login = async ({email, password}) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Vérifier le mot de passe en utilisant bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Si le mot de passe correspond, renvoyer l'userId et le token JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key');
        return {userId: user._id, token}
        // res.status(200).json({ userId: user._id, token }); // Renvoyer l'userId avec le token
      } catch (error) {
        console.error('Login failed:', error);
        // I hate try catch

        // now here I want to send an error to back to route, that hell
        // now to catch this I need to try catch in route as well..
        // but for right now, i will skip
        // i will implement a better way to handle errors
        // that will bit complex
        // res.status(500).json({ message: 'Internal server error' });
        // so u could asked why we dont bring req object here, right?  res and req ? yeah emm i do know why haha im little bit confused haha
        // ok no worries, I can pass req, and res in this function above like this way
        // const login = (req, res) => {}
        // but this is bad approach. we seperate request in controller
        // this is our bussiness logic so we dont bring req here, if u see
        // this kind of code so it means its bad code ..... Aaah the request part i should never put it in the controller part yeah never, its called seperation,
        // so we dont bring it here
        // because of this it will cause pain to send error back to controller
        // how do we solve this? using async handlers -> that part in last okkk? okay 
        return {message: "Internal server error"}
      }
}

const register = async({email, password}) => {
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        // Hacher le mot de passe avant de l'enregistrer dans la base de données
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Créer un nouvel utilisateur avec le mot de passe haché
        const newUser = await users.create({ email, password: hashedPassword });
    
        // Générer le jeton JWT pour le nouvel utilisateur
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'your_secret_key');
    
        // Envoyer le jeton JWT en réponse
        return {token}
        // res.status(201).json({ token });
      } catch (error) {
        console.error('Registration failed:', error);
        return {message: "Internal server error"}
        // res.status(500).json({ message: 'Internal server error' });
      }
}

// everything ok?? yeah yeah i wanted to say , the try catch and catch do the same things i guess 
// try catch cause pain in ass when you go on layer to layer
// like router -> controller -> service
// when u need user define error, then that day u will cry  hahahaHahahahahha i see x)
// so similar to register

module.exports = {
    login,
    register
}