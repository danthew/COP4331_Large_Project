import React, { useState } from 'react';
import Logo from 'images/logo.png';

console.log(Logo);

let _ud = localStorage.getItem('user_data');
let ud = JSON.parse(_ud);
let userId = ud.id;
let firstName = ud.firstName;

function HomeTitle()
{    
    const Click = async event =>
    {
        event.preventDefault();
        
        alert('settings()');
    };

    // pan = pantry
    // gro = grocery
    
    return(
        <div className="title-bar"> 
            <div className='title-logo'>
                <div class='logo-home'>
                    <div className='logo'>
                        <img height="60px" width="60px" src={Logo} alt="RECIPEASY Logo"></img>                
                    </div>
                </div>
                <div className='title'>
                    <h1 className='title'>RECIPEASY</h1>
                </div>
            </div>
            <div className="welcome-user">
                <span className="welcome-User">Welcome {userId}</span><br/>
            </div>
            <div className="setting-button">
                <button onClick={Click} className="setting-drop">SETTING BUTTON</button>
            </div>
        </div>
    );
};

export default HomeTitle;
