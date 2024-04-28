const app = require("./app")
const connectDB = require("./db")


// now we are in depenedent on app -> so super test can use app easily while for development and prod we use this file in package.json
const init = function(){
    console.log("YESSSSSSSSSSSS")
    // you need env to put variables
    app.listen(3000, async() => {
        await connectDB();
        console.log("Server running on port ", 3000)
    })
}

// call the init func
init();