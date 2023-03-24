import React, {useState} from 'react';

function Register() {
    let registerName;
    let registerUsername;
    let registerPassword;
    let registerDOB;
    let registerEmail;
    const [message, setMessage] = useState("");

        let bp = require("../../BuildPath.js");
        const [passwordShown, setPasswordShown] = useState(false);

    const doRegister = async (event) => {

        event.preventDefault();

        let obj = {
            name: registerName.value,
            username: registerUsername.value,
            password: registerPassword.value,
            dob: registerDOB.value,
            email: registerEmail.value
        }

        if(obj.name === "" || obj.username === "" || obj.password === "" || obj.dob === "" || obj.email === "") {

            setMessage("Please make sure the fields are not empty.");
            return;
        }
        console.log(registerName.value);

        let js = JSON.stringify(obj);
        const headers = {"Content-Type": "application/json"}

        try {
            const response = await fetch(bp.buildPath('register'), {
                method: "POST",
                body: js,
                headers: headers
            })
            var res = JSON.parse(await response.text());
            if(res.id <= 0) {
                setMessage('There was an error trying to register.');
            }
            else {
                var user = {
                    firstName: res.name,
                    id: res.id
                };
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('Registered successfully');
                window.location.href = "/login";

            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    }
        return (
    <div id="registerDiv">
        <div className="registerText">
            <form onSubmit={doRegister}>
                <h1 id="title">Register</h1>
                <div id="input_text">
                <label id="input_label">First Name</label><input type="text" id="registerName" placeholder="Name" ref={ (c) => registerName = c}/><br />               
                </div>
                <div id="input_text">
                <label id="input_label">Email</label><input type="text" id="registerEmail" placeholder="Email" ref={(c) => registerEmail = c}/><br />       
                </div>
                <div id="input_text">
                <label id="input_label">Date of Birth</label><input type="text" id="registerDOB" placeholder="Date of Birth" ref={(c) => registerDOB = c}/><br />            
                </div>
                <div id="input_text">
                </div>
                <div id="input_text">
                <label id="input_label">Username</label><input type="text" id="registerUsername" placeholder="Username"   ref={(c) => registerUsername = c}/><br />             
                </div>
                <div id="input_text">
                <label id="input_label">Password</label><input type={passwordShown ? "text" : "password"} id="registerP assword" placeholder="Password" ref={(c) => registerPassword = c}/><br />               
                </div>
                <input type="submit" id="registerButton" className="buttons" value="Register" onClick={doRegister}/>
            </form>
            <span id="registerResult"></span>
        </div>
    </div>
);
}
export default Register;
