const Transaction = require ('../models/transactionsModel')
const Budget = require("../models/budgetModel")
const ApiError = require("../utils/ApiError")
const httpStatus = require("http-status")
const create = async ({ name, amount, budgetId }, user) => {
        const budget = await Budget.findById(budgetId)
        console.log("old amount", budget.amount, "new amunt", amount) // thisssss
        if(budget.amount - amount < 0){
            throw new ApiError(httpStatus.BAD_REQUEST, "your budget amount exceeded!")
        }
        const transaction = await Transaction.create({
            name,
            amount,
            // date: new Date(), // Utilisation de la date actuelle lors de la création de la transaction
            //  you dont need th ok 
            userId: user.userId,
            budgetId: budgetId,
        });
        budget.amount -= amount;
        console.log("New amount =>", budget.amount) // compare the above and this
        await budget.save()
        return await Transaction.findById(transaction._id).populate("budgetId")
}



const findOne = async (filter) =>{
    return await Transaction.findOne(filter).populate("budgetId")
}

const find = async (filter) =>{
    const transactions = await Transaction.find(filter).populate("budgetId")
    return transactions
}

const deleteOne = async (id) => {
        console.log("Delete => ",id) // when it shows on terminal copy and check in db, is it exists?
        const transaction = await findOne({ _id: id})
        if (!transaction) {
            throw new ApiError(httpStatus.NOT_FOUND, "No transaction exists")
        }
        const budget = await Budget.findById(transaction.budgetId._id)
        budget.amount += transaction.amount;
        await budget.save()
        console.log(transaction)
        await Transaction.deleteOne({_id: id}) 
        return { message : "Expense deleted"}
}


module.exports = {
    create,
    find,
    findOne,
    deleteOne
}