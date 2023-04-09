import React, {useState} from 'react';

function Register() {
    let registerName;
    let registerUsername;
    let registerPassword;
    let registerDOB;
    let registerEmail;
    const [message, setMessage] = useState("");

    let bp = require("../BuildPath.js");
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
        console.log(obj);

        let js = JSON.stringify(obj);
        const headers = {"Content-Type": "application/json"}

        try {
            const response = await fetch(bp.buildPath('api/register'), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json", 
                            "Access-Control-Allow-Origin" : "https://localhost:5001" || "https://us-central1-recipeasy-ec759.cloudfunctions.net/",
                            "Access-Control-Allow-Methods" : "POST"},
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
                window.location.href = "/";

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
                <div className="input-text">
                    <input type="text" id="registerName" placeholder="Name" className="input" ref={ (c) => registerName = c}/><br />               
                </div>
                <div className="input-text">
                    <input type="text" id="registerEmail" placeholder="Email" className="input" ref={(c) => registerEmail = c}/><br />       
                </div>
                <div className="input-text">
                    <input type="text" id="registerDOB" placeholder="Date of Birth" className="input" ref={(c) => registerDOB = c}/><br />            
                </div>
                <div className="input-text">
                    <input type="text" id="registerUsername" placeholder="Username" className="input"  ref={(c) => registerUsername = c}/><br />             
                </div>
                <div className="input-text">
                    <input type={passwordShown ? "text" : "password"} id="registerP assword" placeholder="Password" className="input" ref={(c) => registerPassword = c}/><br />               
                </div>
                    <input type="submit" id="registerButton" className="button" value="Register" onClick={doRegister}/>
            </form>
            <span id="registerResult"></span>
        </div>
    </div>
);
}
export default Register;
