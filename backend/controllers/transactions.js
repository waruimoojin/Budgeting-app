const Transaction = require ('../models/transactionsModel')
const create = async ({ name, amount }, user, budget) => {
    try {
        const transaction = await Transaction.create({
            name,
            amount,
            date: new Date(), // Utilisation de la date actuelle lors de la création de la transaction
            userId: user.userId,
            budgetId: budget,
        });
        return transaction;
    } catch (err) {
        console.log("Error: ", err);
        return { message: "Could not create an expense!" };
    }
}



const findOne = async (filter) =>{
    return await Transaction.findOne(filter)
}

const find = async (filter) =>{
    try {
        const transactions = await Transaction.find(filter).populate("budgetId")
        return transactions
    } catch (err) {
        console.log("Error: ", err)
        console.log()
        return { message : " u have an error"}
    }
}

const deleteOne = async (id) => {
  
   
    try {
        const transaction = await findOne({ _id: id}) 
        if (!transaction) {
            return { message : "No expenses found"}
        }
        console.log(transaction)
        await Transaction.deleteOne({_id: id}) 
        return { message : "Expense deleted"}

    } catch (err) {
        console.log("Error: ", err)
        console.log()
        return { message: "u have and error"}
    }
}


module.exports = {
    create,
    find,
    findOne,
    deleteOne
}