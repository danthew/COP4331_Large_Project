import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from "firebase";

firebase.initilizeApp = {
  apiKey: "AIzaSyCLxtVg_Ad5YNVGQHuecjYdIYXyzm4RrUg",
  authDomain: "recipeasy-ec759.firebaseapp.com",
  databaseURL: "https://recipeasy-ec759-default-rtdb.firebaseio.com",
  projectId: "recipeasy-ec759",
  storageBucket: "recipeasy-ec759.appspot.com",
  messagingSenderId: "292406285745",
  appId: "1:292406285745:web:022fe474eb1ad249035990",
  measurementId: "G-9X7Z2ZH6V7"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
