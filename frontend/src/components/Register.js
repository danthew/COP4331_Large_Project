import React from 'react';

function Register() {
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerPassword;
    let registerDOB;
    let registerEmail;
    const [message, setMessage] = useState("");

    const doRegister = async (event) => {

        event.preventDefault();

        let obj = {
            firstName: registerFirstName.value,
            lastName: registerLastName.value,
            username: registerUsername.value,
            password: registerPassword.value,
            dob: registerDOB.value,
            email: registerEmail.value
        }

        if(obj.firstName == "" || obj.lastName == "" || obj.username == "" || obj.password == "" || obj.dob == "" || obj.email == "") {
            setMessage("Please make sure the fields are not empty.");
            return;
        }

        let payload = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath("api/register"), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" },
            });
            var res = JSON.parse(await response.text());
            if(res.id <= 0) {
                setMessage('There was an error trying to register.');
            }
            else {
                var user = {
                    firstName: res.firstName,
                    lastName: res.lastName,
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
    <div id="registerDiv">
        <div class="registerText">
            <form onSubmit={doRegister}>
                <div id="input_text">
                <label id="input_label">First Name</label><input type="text" id="registerFirstName" placeholder="First Name"/><br />
                </div>
                <div id="input_text">
                <label id="input_label">Last Name</label><input type="text" id="registerLastName" placeholder="Last Name"/><br />
                </div>
                <div id="input_text">
                <label id="input_label">Email</label><input type="text" id="registerEmail" placeholder="Email"/><br />
                </div>
                <div id="input_text">
                <label id="input_label">Date of Birth</label><input type="text" id="registerDOB" placeholder="Date of Birth"/><br />
                </div>
                <div id="input_text">
                <label id="input_label">Username</label><input type="text" id="registerUsername" placeholder="Username"/><br />
                </div>
                <div id="input_text">
                <label id="input_label">Password</label><input type={passwordShown ? "text" : "password"} id="registerPassword" placeholder="Password"/><br />
                </div>
                <input type="submit" id="registerButton" class="buttons" value="Register" onClick={doRegister}/>
            </form>
            <span id="registerResult"></span>
        </div>
    </div>
}
export default Register;
