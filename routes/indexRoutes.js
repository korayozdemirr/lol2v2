const express = require("express");
const router = express.Router();
const firebase = require("firebase");
router.get("/", (req, res) => {
    if (!req.session.user) {
        res.render("home");
    } else {
        res.redirect("/dashboard");
    }
    // console.log(req.session);
});

router.get("/dashboard", (req, res) => {
    if (req.session.user) {
        userId = req.session.user;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            console.log(snapshot.val());
        });

        res.send("Dashboard");
    } else {
        res.redirect("/");
    }
});
module.exports = router;