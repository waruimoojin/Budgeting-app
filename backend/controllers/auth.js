// depend upon how many things u need
const User = require("../models/usersModel.js") // 1 min okay bro
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError =  require("../utils/ApiError")
const httpStatus = require("http-status")
const Budget = require('../models/budgetModel.js'); // Assurez-vous de spécifier le bon chemin d'accès au modèle Budget

// it is standard to captilize Model Name
const login = async ({email, password}) => {
  
        const user = await User.findOne({ email });
        if (!user) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Invlid email and password")
        }
        
      
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Invlid email and password")
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key');

        const existingBudgets = await Budget.find({ userId: user._id });
        
        if (existingBudgets.length > 0) {
          return { userId: user._id, token, hasBudgets: true };
            } else {
          return { userId: user._id, token, hasBudgets: false };
          
        }
        
             
}

const register = async({email, password}) => {
  
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new ApiError(httpStatus.BAD_REQUEST, "User already exists")
        }
    
        // Hacher le mot de passe avant de l'enregistrer dans la base de données
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Créer un nouvel utilisateur avec le mot de passe haché
        const newUser = await User.create({ email, password: hashedPassword });
    
        // Générer le jeton JWT pour le nouvel utilisateur
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'your_secret_key');
    
        // Envoyer le jeton JWT en réponse
        return {token}
        // res.status(201).json({ token });
}


module.exports = {
    login,
    register,
   
    
}