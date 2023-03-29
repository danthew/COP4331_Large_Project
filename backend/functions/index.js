// Setting up access to certain directories
const functions = require("firebase-functions");
const admin = require("firebase-admin");
var cors = require('cors');
const app = require('express')();

// app.use(cors({
//     origin: "https://recipeasy123.herokuapp.com",
//     methods: ["GET", "POST"],
// }));
admin.initializeApp();

// Config information (may move to a private file)
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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

const fb = require('firebase/app');
fb.initializeApp(firebaseConfig);

const fbauth = require("firebase/auth");
const { user } = require("firebase-functions/v1/auth");
const { json } = require("express");
const auth = fbauth.getAuth();

const db = admin.firestore();

// Tester to make sure that the api is working
app.get('/goodbyeWorld', (req, res) => {
    res.send("Goodbye World ); !")
});

// If token is desired instead of userId, refer to Full Stack Video #5

// Api endpoint for registering users
// Request should include email, password, username, name, and dob
// It returns the userId
app.post('/register', (req, res) => {
    let userInfo = req.body;

    const newUser = {
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
        name: userInfo.name,
        dob: userInfo.dob
    };
    let tk, userId;
    // Getting the information from the database
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
            return res.status(202).json({userId : userId});
        })
        .catch(err => {
            if(err.code === 'auth/email-already-in-use')
                return res.status(400).json({ email: 'Email is already in use'});
            else
                return res.status(500).json({ error : err.code });
        });
});

// Api endpoint that allows for login, takes an email and a password
// Returns the userId
app.post('/login', (req, res) => {
    let userInfo = req.body;
    const user = {
        email: userInfo.email,
        password: userInfo.password
    };
    fbauth.signInWithEmailAndPassword(auth, user.email, user.password)
        .then(data => {
            return res.status(201).json({userId : data.user.uid});
        })
        .catch(err => {
            if(err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found')
                return res.status(403).json({ general: "Wrong credentials."});
            if (err.code === 'auth/invalid-email')
                return res.status(401).json({general: "Invalid email."});
            if (err.code === 'aut/missing-email')
                return ren.status(401).json({general : "Missing email."})
                console.log(err);
            return res.status(500).json({ error : err.code });
        });
});

// Verify Email

// Add recipe

app.post('/addRecipe', (req, res) => {
    let recipeInfo = req.body;

    console.log(recipeInfo.name);
    console.log(recipeInfo.cuisine);
    console.log(recipeInfo.cookTime);
    console.log(recipeInfo.prepTime);
    console.log(recipeInfo.allowSubs);
    console.log(recipeInfo.userId);

    const newRecipe = {
        name : recipeInfo.name,
        cuisine : recipeInfo.cuisine,
        cookTime : recipeInfo.cookTime,
        prepTime : recipeInfo.prepTime,
        allowSubs : recipeInfo.allowSubs,
        userId : recipeInfo.userId
    };

    db.collection("recipes").add(newRecipe)
        .then((ref) => {
            return res.status(201).json({ general : "Success!" });
        })
        .catch((err) => {
            return res.status(500).json({ error : err.code });
        });
});

// Remove recipe

app.delete('/deleteRecipe', (req, res) => {
    db.collection("recipes").doc(req.body.recipeId).get()
        .then((doc) => {
            if(doc.exists) {
                db.collection("recipes").doc(req.body.recipeId).delete()
                    .then(() => {
                        return res.status(200).json({ general : "Successful Deletion!" });
                    })
                    .catch((err) => {
                        return res.status(500).json({ error : err.code });
                    })
            }
            else {
                return res.status(404).json({ general : "Recipe not Found!" });
            }
        })
        .catch((err) => {
            return res.status(500).json({ error : err.code });
        });
})

// Get recipe

app.get('/getRecipe', (req, res) => {
    db.collection("recipes").doc(req.body.recipeId).get()
        .then((doc) => {
            if(doc.exists) {
                return res.status(200).json(doc.data());
            }
            else {
                return res.status(404).json({general : "Recipe not Found!" });
            }
        })
        .catch((err) => {
            return res.status(500).json({ error : err.code });
        })
})

// Edit recipe

// Add Ingredient to Recipe

// Add Instruction to Recipe

// Add Ingredient to Pantry

// Add/Remove Ingredient to List : Toggle Boolean

// Remove Ingredient from Recipe

// Add Ingredient to Pantry

// Make Recipe : Update Pantry based off of selected recipes

// List/Sort/Filter Recipes

exports.api = functions.https.onRequest(app);
