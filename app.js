const mongoose = require('mongoose')


const connectDB = async() => {
    try {
        const connect = await mongoose.connect("mongodb://172.20.0.2:27017/DB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
        })
        console.log("MongoDB Connected")
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
}

connectDB()