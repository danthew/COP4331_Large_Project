import React, {useState} from 'react';
import { useCookies } from 'react-cookie';



function Login() {
    const [message, setMessage] = useState("");
    var forgotPass;
    
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

    const doForgot = async event => {
        event.preventDefault();

        var obj = {
            email : forgotPass.value
        };

        var js = JSON.stringify(obj);

        try{
            const response = await fetch(buildPath('api/resetPassword'), {
                method: 'POST',
                body: js,
                headers: {
                  'Content-Type': 'application/json',
                },
            });

            var res = JSON.parse(await response.text());

            if(res.id <= 0)
            {
                setMessage('Email is Incorrect');
            }
            else
            {
                window.location.href = "/VerificationPage";
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }

        //alert(forgotPass.value);
    };
 
    return (
        <div>
            <div >
                <form>
                    <div className="input-text">
                        <input type="text" placeholder="Email" className="input" ref={(c) => forgotPass = c} /><br />
				    </div>
                    <input type="submit" className="button" value="Submit" onClick={doForgot}/>
                </form>
                <span>{message}</span>
            </div>
        </div>
    );
}

export default Login;
