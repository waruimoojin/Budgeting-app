const mongoose = require('mongoose');
const express = require('express');
const users = require('./models/usersModel');
const category = require('./models/categoryModel');
const transactions = require('./models/transactionsModel');
const app = express();
const port = 3000;
const http = require('http');






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

connectDB()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// POST
app.use(express.json());

app.post('/users' ,async(req,res)=>{

   try {
    const Users = await users.create(req.body)
    res.status(200).json(Users)
   
   } catch (error) {
    console.log(error.message);
    res.status(500).json({message : error.message})
    
   }


});


app.post('/category' ,async(req,res)=>{

    try {
     const Category = await category.create(req.body)
     res.status(200).json(Category)
    
    } catch (error) {
     console.log(error.message);
     res.status(500).json({message : error.message})
     
    }
 
 
 });



 app.post('/transactions' ,async(req,res)=>{

    try {
     const Transaction = await transactions.create(req.body)
     res.status(200).json(Transaction)
    
    } catch (error) {
     console.log(error.message);
     res.status(500).json({message : error.message})
     
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



 const server = http.createServer(app);

app.listen(port, () => {
    console.log(`Example app listening on port 3000`);
});

