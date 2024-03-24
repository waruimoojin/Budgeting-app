const express = require("express")
const router = express.Router()
const {authController} = require("../controllers")

// did u got it?
 // u need to call it down it guess after the wait u need to change to authcontroller.login ?
    // actually its kind of class structure, so all functions are
    // attached to authController, so it can distingusih this
    // thats it
 /**
 * Login API
 */
router.post("/login", async (req, res) => {
    const {body} = req;
    if(!body.email || !body.password)
        return res.status(400).send({message: "email or password are required!"})
    const response = await authController.login(body) // we will create this;
    res.status(200).send(response)

    // waiting for ur response u see my message below ? 
})

// are u sending any data while calling api on frontend?? yeah i try after u fiinishing 
// i retry ?
// now again call api // now again
// are u sending any data? // i put the user email and password same error
// no body in request??

/**
 * Register API
 */

router.post("/register", async (req, res) => {
    const {body} = req;

    // now its fun, i think why
    // hahaha just kidding
     // so any questions here? no x)
     // so now we will replace route from app.js to this
     if(!body.email || !body.password)
        return res.status(400).send({message: "email or password are required!"})
    const response = await authController.register(body)
    res.status(200).send(response)
})
// now test register
// ok ?? okay good. now in controller

module.exports = router