const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware');
const path = require('path');




const mongoose = require('./database');
const session = require('express-session');







const server = app.listen(port,()=>{
    console.log("server is running on port:"+port);
})

app.set("view engine","pug");
app.set("views","views");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false
}));






//Routes
const Loginroutes = require('./routes/loginroutes');
const Registerroutes = require('./routes/registerroutes');
app.use('/login',Loginroutes);
app.use('/register',Registerroutes);







app.get('/',middleware.requireLogin,(req,res,next)=>{
    var payload = {
        pageTitle: "home",
        userloggedin: req.session.user
    }
    
    res.status(200).render("home",payload);
})