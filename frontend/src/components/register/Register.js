import React, {useState} from 'react';
import { useCookies } from 'react-cookie';

function Register() {
    let registerName;
    let registerUsername;
    let registerPassword;
    let registerDOB;
    let registerEmail;
    const [message, setMessage] = useState("");
    const [cookie, setCookie] = useCookies(['userId', 'email']);

    let bp = require("../BuildPath.js");
    const [passwordShown, setPasswordShown] = useState(false);

    const doRegister = async (event) => {

        event.preventDefault();

        let obj = {  
            email: registerEmail.value,
            password: registerPassword.value,
            username: registerUsername.value,
            name: registerName.value,
            dob: registerDOB.value   
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
                headers: { "Content-Type": "application/json" },
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
                setCookie('userId', res.userId, {path: '/'});
                setCookie('email', registerEmail.value, {path: '/'});
                console.log(cookie.userId);
                console.log(cookie.email);
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

