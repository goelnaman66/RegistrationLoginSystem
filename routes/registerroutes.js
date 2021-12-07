const express = require('express');
const app = express();
const router = express.Router();
const User = require('../schemas/userschema');
const bcrypt = require('bcrypt');
const session = require('express-session');


app.set("view engine", "pug");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

router.get("/", (req, res, next) => {

    res.status(200).render("register");
})

router.post("/", async (req, res, next) => {

    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if(firstName && lastName && username && email && password) {
        console.log(req.body);

        //query
        //this will print null if not found 


        // User.findOne({ 
        //     $or: [
        //         {username: username},
        //         {email: email}
        //     ]
        // })
        // .then((user)=>{
        //     console.log(user);
        // })
        // console.log("Printing before then is executed -async")

        //await this will print null first then execute the heelo printing
        var user = await User.findOne({ 
            $or: [
                {username: username},
                {email: email}
            ]
        })
        .catch((err)=>{
            console.log(err);
            payload.errorMessage = "something went wrong.";
            res.status(200).render("register", payload);
        });
        console.log(user);
        console.log("printing after await is executed!");
       
    


        if(user==null){
            //no user found
            var data=req.body;
            data.password=await bcrypt.hash(password,10);
            User.create(data)
            .then((user)=>{
                
                req.session.user=user;
                return res.redirect("/");
            })
        }
        else{
            //user found
            if(email==user.email){
                payload.errorMessage="Email already in user";
                res.status(200).render("register", payload);
            }
            else{
                payload.errorMessage="username already in user";
                res.status(200).render("register", payload);
            }
        }


    }


    else {
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register", payload);
    }
})

module.exports = router;