const mongoose = require('mongoose');
const express = require('express');
const users = require('./models/usersModel');
const category = require('./models/categoryModel');
const budget = require('./models/budgetModel');
const transactions = require('./models/transactionsModel');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const indexRoute = require('../client/routes/index'); // Chemin relatif pour accéder à index.js depuis App.js
const authRoute = require('../client/routes/auth'); // Chemin relatif pour accéder à auth.js depuis App.js
const port = 3000;





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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..','client','views'));
// app.js

// Routes
app.use('/', indexRoute);
app.use('/auth', authRoute);

// Servir les fichiers statiques de l'application React depuis le répertoire client/build
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Rediriger toutes les routes non définies vers l'application React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'main.js'));
  res.redirect('http://localhost:3001/budget');


});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..','client', 'src', 'components' ,'Login.js'));
});

// Route pour servir la page d'inscription
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..','client', 'src', 'components' ,'Register.js'));
});

// Démarrer le serveur Node.js sur le port 3000




connectDB()

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// POST
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const Users = await users.create(req.body)
    res.status(200).json(Users)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }
});

app.post('/budget', async (req, res) => {
  try {
    const Budget = await budget.create(req.body)
    res.status(200).json(Budget)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
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

app.post('/transactions', async (req, res) => {
  try {
    const Transaction = await transactions.create(req.body)
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
app.get('/budget', async (req, res) => {
  try {
    const allBudget = await budget.find();
    res.status(200).json(allBudget);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


app.get('/transactions', async (req, res) => {
  try {
    const allTransactions = await transactions.find();
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
  console.log(`Example app listening on port 3001`);
});
