import React from 'react';
import Logo from 'images/logo.png';

function HomeTitle()
{    
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    
    const dropdown = async event =>
    {
        event.preventDefault();
        document.getElementById("dropdown-content").classList.toggle("show");
        
        //alert('settings()');
    };

    const profile = async event =>
    {
        event.preventDefault();

        alert('profile');
    }

    const logout = async event =>
    {
        event.preventDefault();
        localStorage.removeItem("user_data");
        window.location.href = '/';

        alert('logout');
    }

    window.onclick = function(event)
    {
        if (!event.target.matches('.setting-drop'))
        {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i=0; i < dropdowns.length; i++)
            {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show'))
                {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
    
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
                <button onClick={dropdown} className="setting-drop">SETTING BUTTON</button>
                <div id="dropdown-content" className='dropdown-content'>
                    <button onClick={profile} className="drop-button" id="profile">Profile</button>
                    <button onClick={logout} className="drop-button" id="logout">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default HomeTitle;
