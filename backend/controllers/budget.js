const Budget = require("../models/budgetModel")
// ok depedning upon number of layer start from last layer
// like if i have four layers
// 1. routes
// 2. controllers
// 3. services
// 4. validations (u need this in future to validate request data)
// 5. models
// so I will start from model
// then services -> same crud > create, find, findOne, update, the delete
// same function names all over the layers
// then controllers
// then routes

const create = async ({ name, amount }, user) => {
    console.log(amount, name, user)
    // what do u send while creating a budget? budget name and the amount 
    // u need user as well i think? for the userId that link the budget to the user ?
    // I forgot about try catch
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

// similarly 
// const update = async(body) => {} // ok okay i'll add it 

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
        // const budgets = await Budget.update(body)
        // return budgets    // 
        // now complete the try catch
    } catch (err) {
        console.log("Same Error:", err)
        console.log() // see auto format shoudl i test the budget ?or
        return { message: "u have an error" }  // wait
    }
}

const deleteOne = async (id) => {
    try {
        const budget = await findOne({ id: id })
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

// use pretier extension to auto format code i guess i have one i need to select all and do it 

module.exports = {
    create,
    find,
    findOne,
    updateOne,
    deleteOne
}
//   deleteOne , yeah sorry i guess with the practice we learn like not in the schools or whatsoever
// yeah exactly, u need practice, now u are new so
// dont worry, keep watching .. ok now we go on route side okay


// ok from here? ?? yeah i get the basics and i see what u did but im still a little confused haha