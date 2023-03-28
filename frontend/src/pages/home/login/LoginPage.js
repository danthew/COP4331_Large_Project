import React from 'react';

import Login from 'components/login/Login';
import Register from 'components/register/Register';
import Logo from 'images/logo.png';

console.log(Logo);

const loginButton = async event =>
    {   
        event.preventDefault();
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display    = "block";
        document.getElementById("register-button").style.backgroundColor = "#ffffff";
        document.getElementById("login-button").style.backgroundColor = "#3590d5";
    };

const registerButton = async event =>
    {
        event.preventDefault();
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "block";
        document.getElementById("login-button").style.backgroundColor = "#ffffff";
        document.getElementById("register-button").style.backgroundColor = "#3590d5";
    };

const LoginPage = () => {
    return (
        <div class="background"> 
            <div class="logo-login">
                <img height="200px" width="200px" src={Logo} alt="RECIPEASY Logo"></img>                
            </div>
            <div className="login-div"> 
                <div className="login-button" id="login-button" onClick={loginButton}>
                    login
                </div>
                <div className="register-button" id="register-button" onClick={registerButton}>
                    register
                </div>
                <div className="login" id="login" style={loginStyle}>
                    <Login />
                </div>
                <div className="register" id="register" style={registerStyle}>
                    <Register />
                </div>
            </div>
        </div>
    );
};

const loginStyle = {
};

const registerStyle = {

};

export default LoginPage;
