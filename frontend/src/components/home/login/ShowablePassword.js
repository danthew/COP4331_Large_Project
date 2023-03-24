import React, {useState} from 'react';

function ShowablePassword() {
    const [passwordShown, setPasswordShown] = useState();
    let loginPassword = "";
    return (
        <div id="input_text">
            <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
            <div className="checkbox_password">
                <label><input type="checkbox" onClick={setPasswordShown(!passwordShown)}/> Show Password </label>
            </div>
        </div>
    );
}

export default ShowablePassword;
