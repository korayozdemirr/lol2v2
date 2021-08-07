const express = require("express");
const router = express.Router();
const firebase = require("firebase");
var jsonParser = express.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = express.urlencoded({ extended: false })
//app
router.post("/forgotpassword", urlencodedParser, async (req, res) => {
    var message = "ok";
    const email = req.body.email;
    await firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            message = "ok";

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            message = errorMessage;
        });
    res.send(message);
})
// POST /login gets urlencoded bodies
router.post('/login', urlencodedParser, async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let message = "";
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            req.session.user = user.uid;
            message = "successful";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            message = errorCode;
        });
    res.send(message);

});
router.post('/register', urlencodedParser, function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let fullName = req.body.fullName;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((users) => {
            req.session.user = users.user.uid;
        }).then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: fullName
            });
            res.send("successful");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            res.send(errorCode);
        });
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