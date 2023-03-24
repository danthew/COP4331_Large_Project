//import React from 'react';
import React, {useState} from 'react';

function Login() {
    
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const doLogin = async (event) =>
            {
                event.preventDefault();
                var obj =
                {
                    login:loginName.value,
                    password:loginPassword.value
                };
    const doLogin = async (event) => {

        console.log("logging in!");

        event.preventDefault();

        let obj = {
            login: loginName.value,
            password: loginPassword.value
        };

        if(obj.login == "" || obj.password == "") {
            setMessage("Please make sure the fields are not empty.");
            return;
        } 

        let bp = require("./BuildPath.js");

        let js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath("login"), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" },
            });
            var res = JSON.parse(await response.text());
            if(res.id <= 0) {
                setMessage('There was an error with your username/password input.');
            }
            else {
                var user = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    id: res.id
                };
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                //window.location.href = "/recipes";

            }
            catch(e)
            {
                alert(e.toString());
                return;
            }
        };
    return (
        <div id="loginDiv">
            <div className="loginText">
                <form onSubmit={doLogin}>
                    <div id="input_text">
                    <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
				    </div>
				    <div id="input_text">
                    <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
				    </div>
                    <input type="submit" id="loginButton" className="buttons" value="Login" onClick={doLogin}/>
                </form>
                <span id="loginResult">{message}</span>
            </div>
        </div>
    );
}
export default Login;
