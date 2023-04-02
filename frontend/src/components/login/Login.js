//import React from 'react';
import React, {useState} from 'react';
import ShowablePassword from 'components/login/ShowablePassword';

function Login() {
    
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const doLogin = async (event) => {

        console.log("logging in!");

        event.preventDefault();

        let obj = {
            email : loginName.value,
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
                headers: { "Content-Type": "application/json", 
                            "Access-Control-Allow-Origin" : "*",
                            "Access-Control-Allow-Methods" : "POST",
                            "Access-Control-Allow-Headers" : "*"},
            });
            var res = JSON.parse(await response.text());
            if(response.status != 201) {
                setMessage('There was an error with your username/password input.');
		        console.log(response.status);
            }
            else {
                var user = {
                    // firstName: res.firstName,
                    id: res.userId
                };
                localStorage.setItem('user_data', JSON.stringify(user));
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

    return (
        <div id="loginDiv">
            <div className="loginText">
                <form onSubmit={doLogin}>
                    <div id="input_text">
                        <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
				    </div>
                    {/* <ShowablePassword/> */}
                    <div id="input_text">
                        <input type="password" name="Password" toggleMask="true" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                    </div>
                    <input type="submit" id="loginButton" className="buttons" value="Login" onClick={doLogin}/>
                    </form>
                <span id="loginResult">{message}</span>
            </div>
        </div>
    );
}

export default Login;
