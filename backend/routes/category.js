const express = require ("express")
const { categoryController } = require ("../controllers")
const router = express.Router()

router.route("/").post( async (req, res) => {
    const { body } = req;
    const category = await categoryController.create(body)
    res.status(200).send(category)
}).get( async ( res) => {
    
    const categories = await categoryController.find()
    res.status(200).send(categories)
})

module.exports = router