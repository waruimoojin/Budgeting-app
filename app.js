const mongoose = require('mongoose');
const express = require('express');
const users = require('./models/usersModel');
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

app.listen(port, () => {
    console.log(`Example app listening on port 3000`);
});