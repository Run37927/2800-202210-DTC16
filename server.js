const express = require("express");
const app = express();

app.listen(process.env.PORT || 6050, function (err) {
    if (err) console.log(err);
});

const bodyparser = require("body-parser");
app.use(
    bodyparser.urlencoded({
        extended: true,
    })
    );
    
    app.use(express.static("./public"));
    
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const e = require("express");
const { query } = require("express");
const dbUrl = "mongodb+srv://elee323:12341234@cluster0.8b8go.mongodb.net/2800-202210-DTC16?retryWrites=true&w=majority"

// mongoose.connect(
//     dbUrl,
//     { useNewUrlParser: true, useUnifiedTopology: true }
//     );
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     pwd: String,
// });
// const userInfoModel = mongoose.model("userInfo", userSchema);

app.post("/signUp", function(req, res){
    console.log("user regiestration requested", req.body)
    userName = req.body.name
    userEmail = req.body.email
    userPassword = req.body.password
    MongoClient.connect(dbUrl, function(err, db){
        if (err) throw err;
        var dbo = db.db("2800-202210-DTC16");
        var userInfoObj = {
            userName : `${userName}`,
            userEmail : `${userEmail}`,
            userPassword : `${userPassword}`
        }
        dbo.collection("userInfo").insertOne(userInfoObj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          })
    })
})