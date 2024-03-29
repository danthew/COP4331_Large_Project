import React from 'react';
import Logo from 'images/logo.png';
import EELogo from 'images/RickLChef2.png';

function HomeTitle()
{    
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let name = ud.name;
    
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
                <div className='logo-home'>
                    <div className='logo'>
                        <img className="OrgLogo" height="60px" width="60px" src={Logo} alt="RECIPEASY Logo"></img>
                        <img className="EasterEgg" height="60px" width="60px" src={EELogo} alt="RECIPEASY Easter Egg logo"></img>     
                    </div>
                </div>
                <div className='title'>
                    <h1 className='title'>RECIPEASY</h1>
                </div>
            </div>
            <div className="welcome-user">
                <span className="welcome-User">Welcome {name}</span><br/>
            </div>
            <div className="setting-button">
                <button onClick={logout} class="search-button" margin="5px">Logout</button>
            </div>
        </div>
    );
};

export default HomeTitle;
