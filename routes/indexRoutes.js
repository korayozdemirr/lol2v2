const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
var jsonParser = express.json();
const firebase = require("firebase");
router.get("/", (req, res) => {
    if (!req.session.user) {
        res.render("home");
    } else {
        res.redirect("/dashboard");
    }
    // console.log(req.session);
});

router.get("/dashboard", async (req, res) => {
    if (req.session.user) {
        userId = req.session.user;
        var user;
        await firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            user = snapshot.val();
        });
        
        console.log(user);
        res.render("login/dashboard", {user});
    } else {
        res.redirect("/");
    }
});
router.get("/logout", async (req, res)=>{
    if(req.session.user){
        req.session.destroy();
        await firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
        
    }
    res.redirect("/");
});
module.exports = router;