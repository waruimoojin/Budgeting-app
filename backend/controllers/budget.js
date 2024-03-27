const Budget = require("../models/budgetModel")


const create = async ({ name, amount }, user) => {
    console.log(amount, name, user)
   
    try {
        const budget = await Budget.create({
            name,
            amount,
            userId: user.userId
        })
        return budget
    } catch (err) {
        console.log("Error: ", err)
        return { message: "Couldnt create budget!" }
    }

}

const findOne = async (filter) => {
    // we can put error handler here as well, but depebn on u
    return await Budget.findOne(filter)
}
// now we can re use this func

const find = async (filter) => {
    try {
        const budgets = await Budget.find(filter)
        return budgets
    } catch (err) {
        console.log("Error: ", err)
        return { message: "Bad Happened" }
    }
}



const updateOne = async (id, body) => {
    try {
        // nop first find the budget
        const budget = await findOne({ id: id })
        if (!budget) {
            return { message: "No budget found" }
        }
        Object.assign(budget, body)
        await budget.save()
        return budget
      
    } catch (err) {
        console.log("Same Error:", err)
        console.log() // see auto format shoudl i test the budget ?or
        return { message: "u have an error" }  // wait
    }
}

const deleteOne = async (id) => {
    try {
        const budget = await findOne({ _id: id })
        if (!budget) {
            return { message: "No budget found" }
        }
        // ok mongoose remove those funcs
        await Budget.findByIdAndDelete(id)
        return { message: "Budget deleted" }
    } catch (err) {
        console.log("Same Error:", err)
        console.log() // see auto format shoudl i test the budget ?or
        return { message: "u have an error" }  // wait
    }
}



module.exports = {
    create,
    find,
    findOne,
    updateOne,
    deleteOne
}
