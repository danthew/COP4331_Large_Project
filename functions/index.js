const functions = require("firebase-functions");
const admin = require("firebase-admin");

const app = require('express')();
admin.initializeApp();

const config = {
    apiKey: "AIzaSyCLxtVg_Ad5YNVGQHuecjYdIYXyzm4RrUg",
    authDomain: "recipeasy-ec759.firebaseapp.com",
    databaseURL: "https://recipeasy-ec759-default-rtdb.firebaseio.com",
    projectId: "recipeasy-ec759",
    storageBucket: "recipeasy-ec759.appspot.com",
    messagingSenderId: "292406285745",
    appId: "1:292406285745:web:022fe474eb1ad249035990",
    measurementId: "G-9X7Z2ZH6V7"
};

const firebase = require('firebase');
firebase.initializeApp(config);

// Sign Up
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userName: req.body.username,
        dob: req.body.dob,
        name: req.body.name
    };

    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(date => {
            return res.status(201).json({ message: `user ${data.user.uid} signed up succesfully`});
        })
        .catch((err) => {
            return res.status(500).json({ error: err.code });
        })
});