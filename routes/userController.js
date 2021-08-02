const express = require("express");
const router = express.Router();
const firebase = require("firebase");
var jsonParser = express.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = express.urlencoded({ extended: false })
//app

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
router.post('/register', urlencodedParser, async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let fullname = req.body.fullName;
    let message = "";
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((users) => {
            firebase.database().ref().child("users").child(users.user.uid).push({
                "name": fullname,
                "email": email
            });
            req.session.user = user.uid;
            message = "succesful";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            message = errorCode;
        });
        res.send(message);
});

module.exports = router;