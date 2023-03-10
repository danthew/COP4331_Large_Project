const functions = require("firebase-functions");
const admin = require("firebase-admin");

const app = require('express')();
admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyCLxtVg_Ad5YNVGQHuecjYdIYXyzm4RrUg",
    authDomain: "recipeasy-ec759.firebaseapp.com",
    databaseURL: "https://recipeasy-ec759-default-rtdb.firebaseio.com",
    projectId: "recipeasy-ec759",
    storageBucket: "recipeasy-ec759.appspot.com",
    messagingSenderId: "292406285745",
    appId: "1:292406285745:web:022fe474eb1ad249035990",
    measurementId: "G-9X7Z2ZH6V7"
};

const fb = require('firebase/app');
fb.initializeApp(firebaseConfig);

const fbauth = require("firebase/auth");
const { user } = require("firebase-functions/v1/auth");
const auth = fbauth.getAuth();

const db = admin.firestore();

app.get('/goodbyeWorld', (req, res) => {
    res.send("Goodbye World ); !")
});

// If token is desired instead of userId, refer to Full Stack Video #5

app.post('/register', (req, res) => {
    let userInfo = JSON.parse(req.body);

    const newUser = {
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
        name: userInfo.name,
        dob: userInfo.dob
    };

    let tk, userId;

    db.doc(`/users/${newUser.username}`).get()
        .then(doc => {
            if(doc.exists) {
                return res.status(400).json({ username: 'username is taken'});
            }
            else {
                return fbauth.createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(token => {
            tk = token;
            const userCredentials = {
                username: newUser.username,
                email: newUser.email,
                userId: userId,
                dob: newUser.dob,
                name: newUser.name
            };
            return db.doc(`/users/${newUser.username}`).set(userCredentials);            
        })
        .then(() => {
            return res.status(201).json({userId : userId});
        })
        .catch(err => {
            if(err.code === 'auth/email-already-in-use')
                return res.status(400).json({ email: 'Email is already in use'});
            else
                return res.status(500).json({ error : err.code });
        });
});

app.post('/login', (req, res) => {
    let userInfo = JSON.parse(req.body);

    const user = {
        email: userInfo.email,
        password: userInfo.password
    };

    fbauth.signInWithEmailAndPassword(auth, user.email, user.password)
        .then(data => {
            return res.json({userId : data.user.uid});
        })
        .catch(err => {
            if(err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found')
                return res.status(403).json({ general: "Wrong credentials"});
            return res.status(500).json({ error : err.code });
        });
});

exports.api = functions.https.onRequest(app);