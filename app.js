const express = require('express');
const router = express.Router();
const session = require("express-session");
const app = express()
const PORT = process.env.PORT || 3000;
const firebase = require('firebase');
require("firebase/auth");
require("firebase/database");
//firebase initializing
const firebaseConfig = {
    apiKey: "AIzaSyA5Fi8D0Wr9M8j8oEURvw3x-9PQdsYNzC0",
    authDomain: "lol2v2.firebaseapp.com",
    databaseURL: "https://lol2v2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lol2v2",
    storageBucket: "lol2v2.appspot.com",
    messagingSenderId: "521321108635",
    appId: "1:521321108635:web:eceb27ab30c784dc56e23e",
    measurementId: "G-2RTXVXSY2P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//routes 
const indexRoutes = require("./routes/indexRoutes");
const userController = require("./routes/userController");
const lolapi = require("./routes/lolapi");
//express session----------------------
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(require('express-session')({
    secret: 'shhhhhh',
    resave: false,
    saveUninitialized: true,

}));
//routes using
app.use(indexRoutes);
app.use(userController);
app.use(lolapi);
//body-parser middleware


//404 page 

app.use((req, res, next) => {
    var users = req.session.user;
    res.status(404).render("404", {users});
});
app.listen(PORT, () => {
    console.log("SERVER START Listining port:" + PORT);
})