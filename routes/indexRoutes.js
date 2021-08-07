const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
    let users;
    if (req.session.user) {
         //user değiştirilecek
        user = firebase.auth().currentUser;
        if (user.photoURL != null) {
            let id =  user.photoURL;
            fetch(`https://tr1.api.riotgames.com/lol/summoner/v4/summoners/${users.photoURL}?api_key=RGAPI-8e1951b8-e889-4c0c-87f8-1cf7d096e7f1`)
                .then((response) => {
                    users = response;
                    return  response.json();
                })
                .then(async(user)=>{
                    
                    firebase.database().ref().child("loluser").child(`${id}`).set({
                        accountId: user.accountId,
                        name: user.name,
                        profileIconId: user.profileIconId,
                        puuid: user.puuid,
                        revisionDate: user.revisionDate,
                        summonerLevel: user.summonerLevel,
                        user: req.session.user
                    });
                    return user
                })
                .then(data =>console.log(data))
                .catch((error) => {
                    console.error(error);
                });
                console.log(users);
        }
        res.render("index", { users });
    } else {
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
module.exports = router;