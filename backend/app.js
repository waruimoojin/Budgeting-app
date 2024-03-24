const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken'); // Import JWT library
const users = require('./models/usersModel');
const category = require('./models/categoryModel');
const budget = require('./models/budgetModel');
const transactions = require('./models/transactionsModel');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const router = express.Router()
const { authenticateToken } = require('../middleware/auth');

const { authRoutes, budgetRoutes } = require("./routes")



console.log("WFT")

// DB CONNECTION
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/BudgetDB", {});
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

connectDB();


app.use(express.json({}))

// use cors package, u dont need all these line of code
// npm i cors
// app.use(cors())
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Include Authorization header
  next();
});
app.options('*', (_req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Include Authorization header
  res.sendStatus(200);
});

// routes
app.use("/api/", authRoutes)
app.use("/budget", budgetRoutes)
// u need to test backend apis in postman
// not right now in future
// first create apis then test one by one as u create in Postman, the in react
// or whatever u want
// fff
// on frontend 
// http://

// so do u need any extra help from here? i need to link the budget to user and expenses but i guesss not for now i'll try to do it alone a
// its already attached to user, look at the model of expense in my transactions pages it's show me all the budgets
// so u will making mistake somewhere, lets see

// now do a test okay

// now test your login 
// can u see the terminal part ? yeah lets see
app.delete('/transactions/:id', async (req, res) => {
  try {
    const deletedTransaction = await transactions.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.get("/transactions", authenticateToken, async (req, res) => {
  console.log("ME TGOOOOOOO")
  try {
    const { user } = req;
    // refresh page and see is it now getting correct transactions
    // here it will fetch current logged user expenses or transactions, yeah that works it fetch the expenses but for the budgets it's shows me all the budget in my DB
    // how u said it was working? do one thing
    // delete all previous budget and transactions and create new budget
    // yeah create new buedgets first, then test it then create transaction and so on
    // but use user token i'll delete all from mongodb and creating new one
    const transactionsWithBudget = await transactions.find({ userId: user._id })
      .populate('budgetId'); // Assurez-vous que le champ 'budgetId' dans votre modèle de transaction est une référence à votre modèle de budget

    res.status(200).send(transactionsWithBudget);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route for user registration
app.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await users.findOne({ email });
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
    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/category', async (req, res) => {
  try {
    const Category = await category.create(req.body)
    res.status(200).json(Category)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }
});

app.post('/transactions', authenticateToken, async (req, res) => {
  try {
    // u need to set user Id, are u sending userId from frontend?
    const { user } = req;
    const Transaction = await transactions.create({
      ...req.body,
      userId: user.userId
    })
    // i misspelled it
    res.status(200).json(Transaction)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }
});


// GET
app.get('/users', async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// okkkkkkkk
// bad practice you included all the code in single file :)
// in practice we do this kind of layring
//   project
//      src
//        routes
//        controllers
//        services
//        middlewares
//        utils
//        you can go more on repository but depend on project Ah i see 
// so lets break down your code
// but for right now we dont go into deep layer of service,
// but i will do a small example at last, let me know if i forgot okay
app.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const { user } = req;
    const allTransactions = await transactions.find({ userId: user.userId });
    res.status(200).json(allTransactions);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/category', async (req, res) => {
  try {
    const allCategory = await category.find();
    res.status(200).json(allCategory);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port 3000`);
});