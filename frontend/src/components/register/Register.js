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
    
    const validate = ()=> {
        if(registerName.value == "") {
            setMessage("A name is required.")
            return;
        }

        if(registerUsername.value == "") {
            setMessage("A username is required.");
            return;
        }

        if(registerPassword.value == "") {
            setMessage("A password is required.");
            return;
        }

        if(registerDOB.value == "") {
            setMessage("A date of birth is required.");
            return;
        }

        if(registerName.value == "") {
            setMessage("An email is required.");
            return;
        }

        var emailExpression = /^[a-zA-z0-9]+?@[a-zA-Z]+?\.[a-z]{3}$/;

        if(!emailExpression.test(String(registerEmail.value))) {
            setMessage('Please enter a valid email');
            return;
        }

        let dobSlash = /^\d{2}?[\/]+\d{2}?[\/]+\d{4}$/;
        let dobDash = /^\d{2}?[\-]+\d{2}?[\-]+\d{4}$/;
	    let dobSpace = /^\d{2}?[\s]+\d{2}?[\s]+\d{4}$/;
	    let dobNum = /^\d{8}?$/;

        if(!dobSlash.test(registerDOB.value) && !dobDash.test(registerDOB.value) && !dobSpace.test(registerDOB.value) && !dobNum.test(registerDOB.value)) {
            //alert("Please verify the phone number is inputed correctly.");
            setMessage("Please enter a valid date of birth");
            return;
        }

        if(dobSpace.test(registerDOB.value)){
            registerDOB.value=registerDOB.value.replaceAll(" ","/");
        }

        else if(dobDash.test(registerDOB.value)){
            registerDOB.value=registerDOB.value.replaceAll("-","/");
        }

        else if(dobNum.test(registerDOB.value)){
            registerDOB.value=registerDOB.value.slice(0,2)+"/"+registerDOB.value.slice(2,4)+"/"+registerDOB.value.slice(4,8);
        }

        var passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;

        if(!passwordExpression.test(registerPassword.value)) {
            setMessage('Passwords require a special character, number, and uppercase character.');
            return;
        }

        var nameExpression = /^[A-Za-z ]{1,30}$/

        if(!nameExpression.test(registerName.value)) {
            setMessage('The name field should include alpha characters and spaces only.');
            return;
        }

        var usernameExpression = /^[a-zA-Z0-9]{1,15}$/;

        if(!usernameExpression.test(registerUsername.value)) {
            setMessage('Please check the username field.');
            return;
        }
    }

    const doRegister = async (event) => {

        event.preventDefault();
        
        validate();

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
                window.location.href = "/user";

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

