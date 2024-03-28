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


router.route("/:id").patch(authenticateToken, async (req, res) => {
    const { body, id } = req;
    const budget = await budgetController.updateOne( id ,body)
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


