import React, {useState} from 'react';
import { useCookies } from 'react-cookie';

function VPage(){

    var nPassword;
    var actionCode;
    var mode;

    const [message, setMessage] = useState("");

    function buildPath(route)
	{
		if (process.env.NODE_ENV === 'production')
		{
		return 'https://us-central1-recipeasy-ec759.cloudfunctions.net/' + route;
		}
		else
		{
		return 'http://localhost:5001/recipeasy-ec759/us-central1/' + route;
		}
	}

    const doVerifyEmail = async (event) => {

        let obj = {
            code: actionCode.value,
        };

        console.log("Verifying email...");

        event.preventDefault();

        let js = JSON.stringify(obj);
        console.log(JSON.stringify(obj,null,2));
        
        try {
            const response = await fetch(buildPath('api/verifyEmailWeb'), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" }
            });
            var res = JSON.parse(await response.text());
            if(response.status == 404) {
                setMessage('Code expired or user not found');
		        console.log(response.status);
            }
            else if(response.status == 400){
                setMessage('Code invalid.')
                console.log(response.status);
            }
            else if(response.status == 500){
                setMessage('Internal server error.')
                console.log(response.status);
            }
            else {
                window.location.href = "/";
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    const doResetPassword = async (event) => {

        let obj = {
            code: actionCode.value,
            newPassword : nPassword.value
        };

        console.log("Resetting password...");

        event.preventDefault();

        let js = JSON.stringify(obj);
        console.log(JSON.stringify(obj,null,2));
        
        try {
            const response = await fetch(buildPath('api/resetPasswordWeb'), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" }
            });
            var res = JSON.parse(await response.text());
            if(response.status == 404) {
                setMessage('Code expired or user not found');
		        console.log(response.status);
            }
            else if(response.status == 400){
                setMessage('Code invalid.')
                console.log(response.status);
            }
            else if(response.status == 401){
                setMessage('Password too weak.')
                console.log(response.status);
            }
            else if(response.status == 500){
                setMessage('Internal server error.')
                console.log(response.status);
            }
            else {
                window.location.href = "/";
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    const params = new URLSearchParams(window.location.search);

    // Get the action to complete.
    mode = params.get("mode");
    // Get the one-time code from the query parameter.
    actionCode = params.get("oobCode");

    console.log(mode + ", " + actionCode);
    
    // Handle the user management action.
    switch (mode) {
        case 'resetPassword':
        // Display reset password handler and UI.
        // Call reset password web api
        return(
        <div className="vpage-content">
            <form onSubmit={doResetPassword}>
                <div className="reset-password">
                    Enter new password: <input type="text" ref={(c) => nPassword = c} /><button className="sub_buttons" onClick={doResetPassword}>SUBMIT</button><br />
                </div>
            </form>
        </div>
        );
        case 'verifyEmail':
        // Display email verification handler and UI.
        // Call verify email web api
        return(
        <div className="vpage-content">
            <button onClick={doVerifyEmail} className='sub_buttons'>VERIFY</button>
        </div>
        );
        default:
        // Error: invalid mode.
        return(
            <div className="v-error">
                Error: invalid code.
            </div>
        );
    }
}

export default VPage;