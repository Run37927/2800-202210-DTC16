const express = require("express");
const app = express();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 6050, function (err) {
  if (err) console.log(err);
});


// handlers 

const bodyparser = require("body-parser");
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);

app.use(session({
  secret: 'sshh', 
  saveUninitialized: false, 
  resave: false
}));

app.use(express.static(__dirname + "/public"));

const isAuth = (req,res,next) => {
  if (req.session.isAuth) {
      next()
  } else {
      res.redirect('/login')
  }
}


// connecting server with DB

const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://elee323:12341234@cluster0.8b8go.mongodb.net/2800-202210-DTC16?retryWrites=true&w=majority";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then((ans) => {
    console.log("DB Connected Successfully")
  }).catch((err) => {
    console.log("Error in the Connection")
  })


// Routers

app.get("/");

// User Sign Up
app.get('/signup', function(req, res){
  res.sendFile(__dirname + "/public/html/register.html")
})


// User Login
app.get('/login', function(req, res){
  res.sendFile(__dirname + "/public/html/login.html")
})


// User Sign up
app.post("/signuprequest", function (req, res) {
  console.log("user regiestration requested", req.body);
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  userModel.find({ userEmail: req.body.email }, (err, userInfo) =>{
    if (err) console.log(err)
    if (userInfo.length != 0){
      res.send({registered: false})
    }else{
      MongoClient.connect(dbUrl, function (err, db) {
        if (err) console.log(err);
        var dbo = db.db("2800-202210-DTC16");
        var userInfoObj = {
          userName: `${userName}`,
          userEmail: `${userEmail}`,
          userPassword: `${userPassword}`,
          userIsAdmin: false,
          soundPreferences: [
            { fire: 0.5, forest: 0.5, river: 0.5, wind: 0.5 },
            { bar: 0.5, beach: 0.5, samba: 0.5 },
            { announcement: 0.5, attendant: 0.5, ambience: 0.5 }
          ]
        };
        dbo.collection("userInfos").insertOne(userInfoObj, function (err, res) {
          if (err) console.log(err);
          console.log("1 document inserted");
          db.close();
        });
      });
      res.send({registered: true, userName: userName})
    }
  })
  
});

// creating user Schema for DB.
const userLoginSchema = new mongoose.Schema({
  userEmail: String,
  userPassword: String,
  userIsAdmin: Boolean,
  soundPreferences: mongoose.Schema.Types.Mixed
});

const userModel = mongoose.model("model", userLoginSchema, "userInfos");

app.post("/requestlogin", function (req, res) {
  console.log("user login requested", req.body);
  email = req.body.email;
  password = req.body.password;
  userModel.find(
    { $and: [{ userEmail: email }, { userPassword: password }] },
    function (err, userInfo) {
      if (err) console.log(err);
    if (userInfo.length != 0){
      req.session.isAuth = true;
      res.send({userId: userInfo[0]._id, userIsAdmin: userInfo[0]._doc.userIsAdmin, loginSuccess: true})
      if (userInfo[0]._doc.userIsAdmin) {
          console.log(userInfo[0]._id + " has logged in as an admin");
        } else {
        console.log(userInfo[0]._id + " has logged in as a norm user");
      }
    }else{
        res.send({loginSuccess: false})
    }
    }
  )
});

// logout
app.get('/logout', (req,res) => {
  req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/")
  })
})

// Admin webpage
app.get("/admin/:id", isAuth, function(req, res){
  console.log(req.params.id)
    userModel.find(
      { $and: [{_id: req.params.id}, { userIsAdmin: true }] }, 
      // {_id: req.query.id}, 
      (err , userInfo) => {
      if(err) console.log(err)
      if(!userInfo){
        res.redirect('/')
      }else if (userInfo[0]?.userIsAdmin){
        console.log("admin page sent to " + req.params.id)
        res.sendFile(__dirname+"/public/html/admin.html")
      }
    })
    
})

// Retreiving user info from DB to the admin page.
app.get("/fetchuserdata", function(req, res) {
  
  userModel.find({ "userIsAdmin" : false}, function(err, userInfo) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + JSON.stringify(userInfo));
    }
    res.send(userInfo);
  })
})

// User webpage
app.get("/welcome/:id", isAuth, function(req, res){
    console.log("beach page sent to " + req.params.id)
    res.sendFile(__dirname+"/public/html/welcomeback.html", __dirname + "/public/images")
})

// Beachbar
app.get("/beachbar/:id", isAuth, function(req, res){
  console.log("beachbar page sent to " + req.params.id)
  res.sendFile(__dirname+"/public/html/beachbar.html", __dirname + "/public/images")
})

// Camp 
app.get("/camp/:id", isAuth, function(req, res){
  console.log("camp page sent to " + req.params.id)
  res.sendFile(__dirname+"/public/html/camp.html", __dirname + "/public/images")
})


// Airplane monitor 
app.get("/monitor/:id", isAuth, function(req, res){
  console.log("monitor page sent to " + req.params.id)
  res.sendFile(__dirname+"/public/html/monitor.html", __dirname + "/public/images")
})

// Get sound preference
app.get("/fetchuserpreference/:id", function(req, res){
  userModel.findOne({_id: req.params.id}, `soundPreferences`, (err, data) => {
    if(err) console.log(err);
    res.send(data)
  })
})

// Store sound preference
app.post("/saveUserSoundPreference", (req,res) => {
  console.log(req.body.changedSoundPreferences)
  data = JSON.stringify(req.body.changedSoundPreferences)
  if(req.body.index == 0){
    userModel.updateOne({_id: req.body.uid}, {$set:{"soundPreferences.0":req.body.changedSoundPreferences}}, (err) => {
      if (err) console.log(err)
    })
  }else if(req.body.index == 1){
    userModel.updateOne({_id: req.body.uid}, {$set:{"soundPreferences.1":req.body.changedSoundPreferences}}, (err) => {
      if (err) console.log(err)
    })
  }else if(req.body.index == 2){
    userModel.updateOne({_id: req.body.uid}, {$set:{"soundPreferences.2":req.body.changedSoundPreferences}}, (err) => {
      if (err) console.log(err)
    })
  }
})