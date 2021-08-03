const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
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
router.get("/user", (req, res)=>{
    function file_get_contents(){
        var url = fetch("https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Rz%20S1phinx?api_key=RGAPI-8e1951b8-e889-4c0c-87f8-1cf7d096e7f1")
        .then(response=>response.json())
        .then(veri=>res.status(404).send("kullanıcı yok"));
         
    }
    file_get_contents();
});
module.exports = router;