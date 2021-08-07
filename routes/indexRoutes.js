const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const fetch = require("node-fetch");
let users;
router.get("/", async (req, res) => {
    if (req.session.user) {
         //user değiştirilecek
        users = firebase.auth().currentUser;
        if (users.photoURL != null) {
            let id =  users.photoURL;
           await fetch(`https://tr1.api.riotgames.com/lol/summoner/v4/summoners/${users.photoURL}?api_key=RGAPI-8e1951b8-e889-4c0c-87f8-1cf7d096e7f1`)
                .then((response) => response.json())
                .then((user)=>{
                    firebase.database().ref().child("loluser").child(id).set({
                        accountId: user.accountId,
                        name: user.name,
                        profileIconId: user.profileIconId,
                        puuid: user.puuid,
                        revisionDate: user.revisionDate,
                        summonerLevel: user.summonerLevel,
                        user: req.session.user
                    });
                    
                    users = user
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        res.render("index", { users });
    }else{
        res.render("index", { users });
    }
    
});
router.get("/logout", async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        await firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });

    }
    res.redirect("/login");
});
router.get("/login", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.render("login");
    }
});
router.get("/register", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.render("register");
    }
});

module.exports = router;