const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 6050, function (err) {
  if (err) console.log(err);
});

const bodyparser = require("body-parser");
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);

app.use(express.static(__dirname + "/public"));


const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const e = require("express");
const { query } = require("express");
const { Admin } = require("mongodb");
const dbUrl =
  "mongodb+srv://elee323:12341234@cluster0.8b8go.mongodb.net/2800-202210-DTC16?retryWrites=true&w=majority";

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

app.get("/");


// User Sign up
app.post("/signuprequest", function (req, res) {
  console.log("user regiestration requested", req.body);
  userName = req.body.name;
  userEmail = req.body.email;
  userPassword = req.body.password;
  MongoClient.connect(dbUrl, function (err, db) {
    if (err) console.log(err);
    var dbo = db.db("2800-202210-DTC16");
    var userInfoObj = {
      userName: `${userName}`,
      userEmail: `${userEmail}`,
      userPassword: `${userPassword}`,
      userIsAdmin: false
    };
    dbo.collection("userInfos").insertOne(userInfoObj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
});

// User Login
app.get('/login', function(req, res){
  res.sendFile(__dirname + "/public/login.html")
})

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then((ans) => {
    console.log("DB Connected Successfully")
  }).catch((err) => {
    console.log("Error in the Connection")
  })
const userLoginSchema = new mongoose.Schema({
  userEmail: String,
  userPassword: String
});
const userLoginModel = mongoose.model("model", userLoginSchema, "userInfos");
app.post("/requestlogin", function (req, res) {
  console.log("user login requested", req.body);
  email = req.body.email;
  password = req.body.password;
  userLoginModel.find(
    { $and: [{ userEmail: email }, { userPassword: password }] },
    // { userEmail: email },
    function (err, userInfo) {
      if (err) console.log(err);
    //   console.log(userInfo[0].userIsAdmin)
    if (userInfo.length != 0){
      res.send({userId: userInfo[0]._id, userIsAdmin: userInfo[0]._doc.userIsAdmin})
      if (userInfo[0]._doc.userIsAdmin) {
          console.log(userInfo[0]._id + " has logged in as an admin");
        } else {
        console.log(userInfo[0]._id + " has logged in as a norm user");
      }
    }else{
        console.log("user info doesn't exist ")
    }
    }
  )
});

// Admin webpage
app.get("/admin/:id", function(req, res){
    console.log(1)
    res.sendFile(__dirname+"/public/admin.html", __dirname+"/public/css/admin.css")
    // res.sendFile(__dirname+"/public/css/admin.css")
})