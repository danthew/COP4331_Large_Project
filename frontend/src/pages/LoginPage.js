import React from 'react';

import Login from '../components/Login';
import Register from '../components/Register';
import Logo from '../images/logo.png';

console.log(Logo);

const loginButton = async event =>
    {   
        event.preventDefault();
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display    = "block";
        document.getElementById("register").style.backgroundColor = "#ffffff";
        document.getElementById("login").style.backgroundColor = "#3590d5";

        //alert('grocery()');
    };

const registerButton = async event =>
    {
        event.preventDefault();
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "block";

        //alert('grocery()');
    };

const LoginPage = () => {
    return (
        <div class="background"> 
            <div class="logo-login">
                <img height="200px" width="200px" src={Logo} alt="RECIPEASY Logo"></img>
            </div>
            <div class="login-div"> 
                <div class="login-button" onClick={loginButton}>
                    login
                </div>
                <div class="register-button" onClick={registerButton}>
                    register
                </div>
                <div class="login" id="login">
                    <Login />
                </div>
                <div class="register" id="register">
                    <Register />
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
