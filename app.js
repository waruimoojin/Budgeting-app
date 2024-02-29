const mongoose = require('mongoose');
const express = require('express');
const users = require('./models/usersModel');
const category = require('./models/categoryModel');
const transactions = require('./models/transactionsModel');
const app = express();
const port = 3000;

// DB CONNECTION
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/BudgetDB", {
            
            
           
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }  
};

connectDB()




// POST
app.use(express.json());

app.post('/users' ,async(req,res)=>{

   try {
    const Users = await users.create(req.body)
    res.status(200).json(users)
   
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



app.listen(port, () => {
    console.log(`Example app listening on port 3000`);
});

