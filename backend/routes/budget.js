const express = require("express")
const { budgetController } = require("../controllers")
const { authenticateToken } = require('../../middleware/auth');
const router = express.Router()

router.route("/").post(authenticateToken, async (req, res) => {
    const { body, user } = req;
    const budget = await budgetController.create(body, user)
    res.status(200).send(budget)
}).get(authenticateToken, async (req, res) => {
    const { user } = req;
    const budgets = await budgetController.find({ userId: user.userId })
    res.status(200).send(budgets)
})

// :id is parameter in request lik -> http://localhost/budget/1233
// 123 is param
router.route("/:id").patch(authenticateToken, async (req, res) => {
    const { body } = req;
    const budget = await budgetController.updateOne(id, body)
    res.status(200).send(budget)
}).get(authenticateToken, async (req, res) => {
    const { id } = req.params;
    const budget = await budgetController.findOne({ _id: id });
    res.status(200).send(budget)
}).delete(authenticateToken, async (req, res) => {
    const { id } = req.params;
    const response = await budgetController.deleteOne(id);
    // like this ?? understood? yes ok then lets move forward
    res.status(200).send(response)
})

module.exports = router

// any questions?? the id is the id for the budget it's created randomly ? or it's the one in the DB 
// yeah but when u call find api u will get all data, every object
// will include _id, so in the frontend when u render the table
// or any other form, u know which object i am deleting, so u will get 
// id from ther and send this id,

// axios.delete("http://localhost:3000/budget/anyMongoDBID")
// still confused? yeah yeah ahahah , the axios delete part , 
// it can be fetch as well, its just a library to call apis
// for fetch it will be like this
// fetch("http://localhost:3000/budget/mongoDBID", {
// method: "DELETE"
//})
// it will be similar to this okay , it's will get the ID 
//  automatically it wont know, u need to pass mongod

// const handleDelete = (row) => {
//     // suppose this is an handler in react
//     // u attached this handler in table row
//     // budgets.map(b => {
//     // <td><button onClick={() => handleDelete(b)}></button></td>
//     //  })
//     // similar to this
//     // so u get the row which is b -> b is the budget object it contain
//     // name, amount, and _id as well
//     // on frontend u can put log on budegts and see what each object have emmm okay , the handledelete will be attached to ' row that in my budget' 
//     //and when i call it in my button it will delete all the date uin the row it's similar to axios.delete in the backend that right ? yeah 

//     const response = await axios.post(`http://localhost:3000/budget/${row.id}`)
//     // like this
//     // it will call backend api which is the above api ,the /:id route yeah, /:id this is just name for backend
//     // when u call it u dont put : u just put the id
//     // the nam,e yeah in my case the name it's id 
//     // yup its id if i make this somethig else, see abovd yeah i see
// }