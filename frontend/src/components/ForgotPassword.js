import React, {useState} from 'react';
import { useCookies } from 'react-cookie';

var forgotPass;

function Login() {
    const [message, setMessage] = useState("");

    const doForgot = async event => {
        event.preventDefault();

        alert('' +forgotPass);
    }
 
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
