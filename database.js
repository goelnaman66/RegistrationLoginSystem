const mongoose = require("mongoose");

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://goelnaman67:7017336953@cluster0.uh30y.mongodb.net/TwittercloneDB?retryWrites=true&w=majority")
        .then(()=>{
            console.log("Database Connection Successful!!");
        })
        .catch((err)=>{
            console.log("database connection error"+err);
        })
    }
}

module.exports = new Database();