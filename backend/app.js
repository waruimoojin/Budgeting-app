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


router.get("/budget", authenticateToken, async (req, res) => {
  console.log("I AM BEING CALLEDDDDDD")
  // it should show
  // this api is not calling???? it should show console
  // do have other api?
  try {
    const { user } = req;
    // can you call this API and see the console what user is showing okay
    console.log("USER => ", user)
    // refresh your frontend and look at second termanin (MongoDB connected)
    // is it showing?
    // your budget mode has userId not user
    const budgets = await budget.find({ userId: user._id });
    res.status(200).send(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/transactions", authenticateToken, async (req, res) => {
  console.log("ME TGOOOOOOO")
  try {
    const { user } = req;
    // refresh page and see is it now getting correct transactions
    const transactionsWithBudget = await transactions.find({ userId: user._id })
      .populate('budgetId'); // Assurez-vous que le champ 'budgetId' dans votre modèle de transaction est une référence à votre modèle de budget

    res.status(200).send(transactionsWithBudget);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route pour récupérer les détails d'un budget spécifique
router.get('/budget/:id', async (req, res) => {
  console.log("OKKKKKKKKKKKKKKKKKKKKK")
  try {
    const budgetId = req.params.id;
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(200).json(budget);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du budget:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// POST
app.use(express.json());

// POST route for user registration
app.post('/api/register', async (req, res) => {
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




app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });

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
    res.status(200).json({ userId: user._id, token }); // Renvoyer l'userId avec le token
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/budget', authenticateToken, async (req, res) => {
  try {
    console.log("I SHOULD CALL, OR I AM OVERIDING")
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

app.post('/transactions',authenticateToken, async (req, res) => {
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
app.get('/budget', authenticateToken, async (req, res) =>  {
  try {
    const {user} =  req;
    console.log("HEREEEEEEEE", user)
    const allBudget = await budget.find({userId: user.userId});
    res.status(200).json(allBudget);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});



app.get('/budget/:id', authenticateToken, async (req, res) => {
  try {
    const budgetId = req.params.id;
    const budgetDetails = await budget.findById(budgetId);
    if (!budgetDetails) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(200).json(budgetDetails);
  } catch (error) {
    console.error('Error fetching budget details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const {user} =  req;
    const allTransactions = await transactions.find({userId: user.userId});
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