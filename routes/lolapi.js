const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const fetch = require("node-fetch");
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: false })


router.post("/summoner", urlencodedParser, (req, res) => {
    const server = req.body.server;
    const name = req.body.summonerName;
    fetch(`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-8e1951b8-e889-4c0c-87f8-1cf7d096e7f1`)
        .then((response) => {
            if (response.status != 200) {
                res.send("404");
            } else {
                return response.json()
            }
        })
        .then((data) => {
            res.send(data);
        })
});
router.post("/thirdparty", urlencodedParser, (req, res) => {
    const summonerId = req.body.summonerId;
    const server = req.body.server;
    fetch(`https://${server}.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/${summonerId}?api_key=RGAPI-8e1951b8-e889-4c0c-87f8-1cf7d096e7f1`)
        .then(response => {
            if (response.status != 200) {
                res.send("400");
            } else {
                return response.json();
            }
        })
        .then(data => res.send(data));

});
router.post("/adduser", urlencodedParser, async (req, res) => {
    var lolid = req.body.id;
    var users = await firebase.auth().currentUser;
    firebase.database().ref().child("loluser").child(lolid).set({
        "accountId": req.body.accountId,
        "puuid": req.body.puuid,
        "name": req.body.name,
        "profileIconId": req.body.profileIconId,
        "revisionDate": req.body.revisionDate,
        "summonerLevel": req.body.summonerLevel,
        "user":req.session.user,
        "server":req.body.server
    })
    .then(() => {
        users.updateProfile({
            photoURL:`${lolid}`
        });
    })
    .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    res.send("reset");
})


module.exports = router;