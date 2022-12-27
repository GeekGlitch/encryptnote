const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://manoj:manoj123@cluster0.n3mg9.mongodb.net/encryptnote"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;