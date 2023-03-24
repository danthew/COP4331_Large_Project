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

                var js = JSON.stringify(obj);

                try
                {
                    const response = await
                    fetch('http://localhost:5000/api/login',
                    {
                        method:'POST',body:js,headers:
                        {
                            'Content-Type':'application/json'
                        }
                    });
                    var res = JSON.parse(await response.text());

                    if( res.id <= 0 )
                    {
                        setMessage('User/Password combinationincorrect');
                    }
                    else
                    {
                    var user =
                    {
                        firstName:res.firstName,
                        lastName:res.lastName,
                        id:res.id
                    }
                    localStorage.setItem('user_data',
                    JSON.stringify(user));
                    setMessage('');
                    window.location.href = '/home';
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
            <div class="loginText">
                <form onSubmit={doLogin}>
                    <div id="input_text">
                    <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
				    </div>
				    <div id="input_text">
                    <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
				    </div>
                    <input type="submit" id="loginButton" class="buttons" value="Login" onClick={doLogin}/>
                </form>
                <span id="loginResult">{message}</span>
            </div>
        </div>
    );
}
export default Login;
