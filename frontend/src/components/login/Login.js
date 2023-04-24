import React, {useState} from 'react';
import ShowablePassword from 'components/login/ShowablePassword';
import { useCookies } from 'react-cookie';

function Login() {
    
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [cookie, setCookie] = useCookies(['userId', 'email']);

    const doLogin = async (event) => {

        console.log("logging in!");

        event.preventDefault();

        let obj = {
            email : cookie.email,
            username: loginName.value,
            password : loginPassword.value
        };

        if(obj.login === "" || obj.password === "") {
            setMessage("Please make sure the fields are not empty.");
            return;
        } 

        let bp = require("../BuildPath.js");

        let js = JSON.stringify(obj);
        console.log(JSON.stringify(obj,null,2));
        
        try {
            const response = await fetch(bp.buildPath('api/login'), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" }
            });
            var res = JSON.parse(await response.text());
            if(response.status != 202) {
                setMessage('There was an error with your username/password input.');
		        console.log(response.status);
            }
            else {
                var user = {
                    name: res.name,
                    id: res.userId
                };
                localStorage.setItem('user_data', JSON.stringify(user));
                setCookie('userId', res.userId, {path: '/'});
                console.log(cookie.userId);
                setMessage('');
                console.log(localStorage.getItem('user_data'));
                window.location.href = "/home";
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    const forgotPassword = async event => {
        event.preventDefault();

        document.getElementsByClassName("login")[0].style.setProperty("display","none");
        document.getElementsByClassName("forgot-pass")[0].style.setProperty("display", "block");
        document.getElementsByClassName("login-button")[0].style.setProperty("background-color","#ffffff");
    }

    return (
        <div id="loginDiv">
            <div className="loginText">
                <form onSubmit={doLogin}>
                    <div className="input-text">
                        <input type="text" id="loginName" placeholder="Username" className="input" ref={(c) => loginName = c} /><br />
				    </div>
                    {/* <ShowablePassword/> */}
                    <div className="input-text">
                        <input type="password" name="Password" toggleMask="true" id="loginPassword" className="input" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                    </div>
                    <div>
                        <button className="forgot" onClick={forgotPassword}>Forgot Password</button>
                    </div>
                    <input type="submit" id="loginButton" className="button" value="Login" onClick={doLogin}/>
                    </form>
                <span id="loginResult">{message}</span>
            </div>
        </div>
    );
}

export default Login;
