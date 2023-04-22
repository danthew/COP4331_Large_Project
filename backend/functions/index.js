// Setting up access to certain directories
const functions = require("firebase-functions");
const admin = require("firebase-admin");
var cors = require('cors')({ origin: true });
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
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
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
    cors(req, res, () => {
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
                if (doc.exists) {
                    return res.status(400).json({ username: 'username is taken' });
                }
                else {
                    return fbauth.createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
                }
            })
            .then(data => {
				let curUser = data.user;
				userId = curUser.uid;
				token = curUser.getIdToken();
				const userCredentials = {
					username: newUser.username,
					email: newUser.email,
					userId: userId,
					dob: newUser.dob,
					name: newUser.name
				};
				db.doc(`/users/${newUser.username}`).set(userCredentials);
				fbauth.sendEmailVerification(curUser)
				.then(() => {
					return;
				})
				.catch(() => {
					return res.status(201).json({ userId : userId, email : "Verification email not sent!"});
				});
			})
			.then(() => {
				return res.status(201).json({ userId: userId, email : "Verification email sent!" });
			})
			.catch(err => {
				if (err.code === 'auth/email-already-in-use')
					return res.status(400).json({ email: 'Email is already in use' });
				else
					return res.status(500).json({ error: err.code });
			});

	});
});

// Api endpoint that allows for login, takes an email and a password
// Returns the information associated with a userId
app.post('/login', (req, res) => {
	cors(req, res, () => {
		let userInfo = req.body;
		let user = {
			email: userInfo.email,
			password: userInfo.password,
			username: userInfo.username
		};
		if (user.email === undefined || user.email === "") {
			db.collection("users").doc(user.username).get()
				.then((doc) => {
					if (doc.exists) {
						user.email = doc.data().email;
						fbauth.signInWithEmailAndPassword(auth, user.email, user.password)
							.then(data => {
								db.collection('users').where('userId', '==', data.user.uid).get()
									.then((querySnapshot) => {
										querySnapshot.forEach((doc) => {
											return res.status(202).json(doc.data());
										});
									}).catch(err => {
										return res.status(500).json({ error: err.code });
									});
							})
							.catch(err => {
								if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found')
									return res.status(403).json({ general: "Wrong credentials." });
								else if (err.code === 'auth/invalid-email')
									return res.status(401).json({ general: "Invalid email." });
								else if (err.code === 'aut/missing-email')
									return ren.status(401).json({ general: "Missing email." })
								else
									return res.status(500).json({ error: err.code });
							});
					}
					else {
						return res.status(403).json({ general: "Wrong credentials" });
					}
				})
				.catch((err) => {
					return res.status(500).json({ error: err.code });
				});
		} else {
			fbauth.signInWithEmailAndPassword(auth, user.email, user.password)
				.then(data => {
					if (data.user.emailVerified == false) {
						return res.status(403).json({ general: "Email not verified." });
					} else {
						db.collection('users').where('userId', '==', data.user.uid).get()
							.then((querySnapshot) => {
								let sent = false;
								querySnapshot.forEach((doc) => {
									sent = true;
									return res.status(202).json(doc.data());
								});
								if (!sent)
									return res.status(404).json({ general: "User data not found!" });
							}).catch((err) => {
								return res.status(500).json({ error: err.code });
							});
					}
				})
				.catch(err => {
					if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found')
						return res.status(403).json({ general: "Wrong credentials." });
					else if (err.code === 'auth/invalid-email')
						return res.status(401).json({ general: "Invalid email." });
					else if (err.code === 'aut/missing-email')
						return res.status(401).json({ general: "Missing email." })
					else
						return res.status(500).json({ error: err.code });
				});
		}
	});
});

// Verify Email

app.post('/verifyEmail', (req, res) => {
	cors(req, res, () => {
		let email = req.body.email;
		let password = req.body.password;
		fbauth.signInWithEmailAndPassword(auth, email, password)
			.then((user) => {
				fbauth.sendEmailVerification(user.user)
					.then(() => {
						if (user.user.emailVerified == false) {
							return res.status(200).json({ email: "Verification email sent!" });
						} else {
							return res.status(403).json({ general: "User already verified." });
						}
					})
					.catch((err) => {
						return res.status(500).json({ error: err.code });
					});
			})
			.catch(err => {
				if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found')
					return res.status(403).json({ general: "User with these credentials not found." });
				else if (err.code === 'auth/invalid-email')
					return res.status(401).json({ general: "Invalid email." });
				else if (err.code === 'aut/missing-email')
					return res.status(401).json({ general: "Missing email." })
				else
					return res.status(500).json({ error: err.code });
			});

	});
});

app.post('/resetPassword', (req, res) => {
	cors(req, res, () => {
		let email = req.body.email;

		db.collection("users").where('email', '==', email).get()
			.then((querySnapshot) => {
				let found = false;
				querySnapshot.forEach(() => {
					found = true;
					fbauth.sendPasswordResetEmail(auth, email)
						.then(() => {
							return res.status(200).json({ email: "Password reset email sent!" });
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						});
				});
				if (!found) {
					return res.status(404).json({ general: "User not found!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});

	});
});

// Add recipe

app.post('/addRecipe', (req, res) => {
	cors(req, res, () => {
		let recipeInfo = req.body;

		const newRecipe = {
			name: recipeInfo.name,
			cuisine: recipeInfo.cuisine,
			cookTime: recipeInfo.cookTime,
			prepTime: recipeInfo.prepTime,
			allowSubs: recipeInfo.allowSubs,
			userId: recipeInfo.userId
		};

		db.collection("recipes").add(newRecipe)
			.then((ref) => {
				return res.status(201).json({ recipeId: ref.id });
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});
	});
});

// Remove recipe

app.delete('/deleteRecipe', (req, res) => {
	cors(req, res, () => {
		db.collection("recipes").doc(req.body.recipeId).get()
			.then((doc) => {
				if (doc.exists) {
					db.collection("recipes").doc(req.body.recipeId).delete()
						.then(() => {
							return res.status(200).json({ general: "Successful Deletion!" });
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						})
				}
				else {
					return res.status(404).json({ general: "Recipe not Found!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});
	});
});

// Get recipe

app.post('/getRecipe', (req, res) => {
	cors(req, res, () => {
		db.collection("recipes").doc(req.body.recipeId).get()
			.then((doc) => {
				if (doc.exists) {
					return res.status(200).json(doc.data());
				}
				else {
					return res.status(404).json({ general: "Recipe not Found!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});
	});
});

// Edit recipe

app.post('/editRecipe', (req, res) => {
	cors(req, res, () => {
		let recipeInfo = req.body;

		const newRecipe = {
			name: recipeInfo.name,
			cuisine: recipeInfo.cuisine,
			cookTime: recipeInfo.cookTime,
			prepTime: recipeInfo.prepTime,
			allowSubs: recipeInfo.allowSubs,
			userId: recipeInfo.userId
		};

		db.collection("recipes").doc(req.body.recipeId).get()
			.then((doc) => {
				if (doc.exists) {
					db.collection("recipes").doc(req.body.recipeId).update(newRecipe)
						.then(() => {
							return res.status(200).json({ general: "Successful Update!" });
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						})
				}
				else {
					return res.status(404).json({ general: "Recipe not Found!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});
	});
});

// Add Ingredient to Recipe
app.post('/addIngredientToRecipe', (req, res) => {
	cors(req, res, () => {

		let ingredientInfo = req.body;
		db.collection("recipes").doc(req.body.recipeId).get()
			.then((doc) => {
				if (doc.exists) {
					const newIngredient = {
						name: ingredientInfo.name,
						quantity: ingredientInfo.quantity,
						recipeId: ingredientInfo.recipeId
					};

					db.collection("recipeIngredients").add(newIngredient)
						.then((ref) => {
							return res.status(201).json({ ingredientId: ref.id });
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						});
				} else {
					return res.status(404).json({ general: "Recipe does not exist." });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});

	});
});

// Remove Ingredient from Recipe

app.delete('/deleteIngredientFromRecipe', (req, res) => {
	cors(req, res, () => {
		db.collection("recipeIngredients").doc(req.body.ingredientId).get()
			.then((doc) => {
				if (doc.exists) {
					db.collection("recipeIngredients").doc(req.body.ingredientId).delete()
						.then(() => {
							return res.status(200).json({ general: "Successful Deletion!" });
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						})
				}
				else {
					return res.status(404).json({ general: "Ingredient not Found!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});
	});
});

// Add Instruction to Recipe
app.post('/addInstruction', (req, res) => {
	cors(req, res, () => {
		let instructionInfo = req.body;

		db.collection("recipes").doc(instructionInfo.recipeId).get()
			.then((doc) => {
				if (doc.exists) {
					const newInstruction = {
						body: instructionInfo.body,
						stepNumber: instructionInfo.stepNumber,
						recipeId: instructionInfo.recipeId
					};
					db.collection("instructions").add(newInstruction)
						.then((ref) => {
							return res.status(201).json({ instructionId: ref.id });
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						});
				} else {
					return res.status(404).json({ general: "Recipe not found!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});

	});
});

// Delete Instruction from Recipe
app.delete('/deleteInstruction', (req, res) => {
	cors(req, res, () => {
		db.collection("instructions").doc(req.body.instructionId).get()
			.then((doc) => {
				if (doc.exists) {
					db.collection("instructions").doc(req.body.instructionId).delete()
						.then(() => {
							return res.status(200).json({ general: "Successful Deletion!" });
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						})
				}
				else {
					return res.status(404).json({ general: "Instruction not Found!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});
	});
});

// Add Ingredient to Pantry

// Add/Remove Ingredient to List : Toggle Boolean

// Remove Ingredient from Recipe

// Add Ingredient to Pantry

// Make Recipe : Update Pantry based off of selected recipes

// List/Sort/Filter Recipes
app.post('/listRecipes', (req, res) => {
	cors(req, res, () => {
		db.collection("users").where("userId", "==", req.body.userId).get()
			.then((data) => {
				let found = false;
				data.forEach((doc) => {
					found = true;
				});
				if (found) {
					db.collection("recipes").where("userId", "==", req.body.userId).get()
						.then((data) => {
							let recipes = [];
							data.forEach((doc) => {
								let curRecipe = doc.data();
								curRecipe.recipeId = doc.id;
								recipes.push(curRecipe);
							});
							return res.status(200).json(recipes);
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						});
				} else {
					return res.status(404).json({ general: "User not found!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});

	});
});

// List Ingredients for Recipe
app.post('/listRecipeIngredients', (req, res) => {
	cors(req, res, () => {
		db.collection("recipes").doc(req.body.recipeId).get()
			.then((doc) => {
				if (doc.exists) {
					db.collection("recipeIngredients").where("recipeId", "==", req.body.recipeId).get()
						.then((data) => {
							let ingredients = [];
							data.forEach((doc) => {
								ingredients.push(doc.data());
							});
							return res.status(200).json(ingredients);
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						});
				} else {
					return res.status(404).json({ general: "Recipe does not exist!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});

	});
});

// List Instructions for Recipe (In step order)
app.post('/listRecipeInstructions', (req, res) => {
	cors(req, res, () => {
		db.collection("recipes").doc(req.body.recipeId).get()
			.then((doc) => {
				if (doc.exists) {
					db.collection("instructions").where("recipeId", "==", req.body.recipeId).get()
						.then((data) => {
							let instructions = [];
							data.forEach((doc) => {
								instructions.push(doc.data());
							});
							instructions.sort((a, b) => {
								return a.stepNumber - b.stepNumber;
							});
							return res.status(200).json(instructions);
						})
						.catch((err) => {
							return res.status(500).json({ error: err.code });
						});
				} else {
					return res.status(404).json({ general: "Recipe does not exist!" });
				}
			})
			.catch((err) => {
				return res.status(500).json({ error: err.code });
			});
	});
});

exports.api = functions.https.onRequest(app);
