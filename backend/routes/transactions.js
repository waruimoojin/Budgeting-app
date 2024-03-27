const express = require("express")
const { transactionController } = require ("../controllers")
const { authenticateToken } = require ("../../middleware/auth");
const router = express.Router()
const mongoose = require("mongoose")

router.route("/").post(authenticateToken, async(req,res) => {
    const { body, user} = req;
    console.log(body); 
    const transaction = await transactionController.create(body, user) 
    console.log(transaction)
    res.status(200).send(transaction)
}).get(authenticateToken, async (req, res) => {
    const { user } = req;
    console.log(req.query)
    const {budgetId} = req.query
    const filter = {
        userId: user.userId
    }
    if (budgetId){
        filter.budgetId = new mongoose.Types.ObjectId(budgetId)
    }
    const transactions = await transactionController.find(filter)
    console.log(transactions)
    res.status(200).send(transactions)
})

router.route("/:id").patch(authenticateToken, async (req, res) => {
    const { body } = req;
    const  transaction = await transactionController.updateOne(id, body)
    res.status(200).send(transaction)
}).get(authenticateToken, async (req, res)=> {
    const { id } = req.params;
    const transaction = await transactionController.findOne({_id: id});
    res.status(200).send(transaction)
}).delete(authenticateToken, async (req, res) => {
    const { id } = req.params;
    console.log("ID ",  id)
    const response = await transactionController.deleteOne(id);
    res.status(200).send(response)
})

module.exports = router
