//jshint esversion:6
const express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb+srv://soniclinkerman:Sonic123@cluster0-ezs9s.mongodb.net/userDB', {useNewUrlParser: true, useUnifiedTopology: true });

var userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema);

app.use(express.static("public"));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}))


app.get("/", function(req, res){
    res.render("home");
})

app.get("/login", function(req, res){
    res.render("login")
})

app.get("/register", function(req, res){
    res.render("register")
})

app.post("/register", function(req, res){
    var newUser = new User({
        email: req.body.username,
        password: req.body.password
    })

    newUser.save(function(err){
        if(err){
            console.log(err)
        } 
        else{
            res.render("secrets")
        }
    })
})

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if(err){
            res.render(err);
        }
        else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("secrets");
                }

            }
            
        }
    })

    
})


app.listen(3004, function(){
    console.log("On Port 3004")
})
