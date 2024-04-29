const Budget = require("../models/budgetModel")


const create = async ({ name, amount }, user) => {

    try {
        const budget = await Budget.create({
            name,
            amount,
            origionalAmount: amount,
            userId: user.userId
        })
        return budget
    } catch (err) {
        console.log("Error: ", err)
        return { message: "Couldnt create budget!" }
    }

}

const findOne = async (filter) => {

    return await Budget.findOne(filter)
}


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

        const budget = await findOne({ id: id })
        if (!budget) {
            return { message: "No budget found" }
        }
        Object.assign(budget, body)
        await budget.save()
        return budget

    } catch (err) {
        console.log("Same Error:", err)
        console.log()
        return { message: "u have an error" }
    }
}

const deleteOne = async (id) => {
    try {
        const budget = await findOne({ _id: id })
        if (!budget) {
            return { message: "No budget found" }
        }

        await Budget.findByIdAndDelete(id)
        return { message: "Budget deleted" }
    } catch (err) {
        console.log("Same Error:", err)
        console.log()
        return { message: "u have an error" }
    }
}



module.exports = {
    create,
    find,
    findOne,
    updateOne,
    deleteOne
}
