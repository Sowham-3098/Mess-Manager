require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});


const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
});


app.get('/', (req, res) => {
    res.send("Hello");
})

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, function(err){
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/secrets");
        });
      }
    });
  
});
  
  



app.listen(process.env.PORT ||3000, function() {
    console.log("Server is running");
});
