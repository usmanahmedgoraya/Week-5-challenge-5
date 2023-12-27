const mongoose = require('mongoose');

// Create MongoDB connection Function
const connectToDB = async(uri) =>{
    try {
        await mongoose.connect(uri)
        console.log("Mongo connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDB