const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken'); // Import JWT library
const users = require('./models/usersModel');
const cors = require("cors");
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const { authRoutes, budgetRoutes, transactionRoutes, categoryRoutes  } = require("./routes")
const { errorConverter, errorHandler } = require("./middlewares/errorHandler");
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
app.use(cors());


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
app.use("/transaction", transactionRoutes)
app.use("/category" , categoryRoutes)



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

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.BAD_REQUEST, "API Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port 3000`);
});

