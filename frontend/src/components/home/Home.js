import React, { useState } from 'react';

let _ud = localStorage.getItem('user_data');
let ud = JSON.parse(_ud);
let userId = ud.id;
let firstName = ud.firstName;
let id = ud.id;

function HomeTitle()
{
    var pantrySearch = '';
    var recipeSearch = '';

    const [message,setMessage] = useState('');
    
    const Click = async event =>
    {
        event.preventDefault();
        
        alert('settings()');
    };

    const doSearch = async event =>
    {
        event.preventDefault();
        
        alert('search() ' + pantrySearch.value);
    };

    const doSearchRecipe = async event =>
    {
        event.preventDefault();
        
        alert('searchRecipe() ' + recipeSearch.value);
    };

    const panButton = async event =>
    {
        event.preventDefault();
        document.getElementById("pan-item").style.display = "block";
        document.getElementById("gro-item").style.display = "none";

        //alert('pantry()');
    };

    const groButton = async event =>
    {
        event.preventDefault();
        document.getElementById("pan-item").style.display = "none";
        document.getElementById("gro-item").style.display = "block";

        //alert('grocery()');
    };

    // pan = pantry
    // gro = grocery

    return(
        <div className="background">
            <div className="title-bar"> 
                <div className='title-logo'>
                    <h1 className='title'>RECIPEASY</h1>
                </div>
                <div className="welcome-user">
                    <span className="welcome-User">Welcome {firstName}</span><br/>
                </div>
                <div className="setting-button">
                    <button onClick={Click} className="setting-drop">SETTING BUTTON</button>
                </div>
            </div>
            <div className="content"> 
                <div className="pan-gro">
                    <div className="pan-gro-ui">
                        <div className="pan-button" onClick={panButton}>
                            <h1 className='title'> Pantry </h1>
                        </div>
                        <div className="gro-button" onClick={groButton}>
                            <h1 className='title'> Grocery List </h1>
                        </div>
                        <div className="search">
                            <form className="search">
                                <input className="search-bar" id="pantrySearch" placeholder="Search Pantry/Grocery List" ref={(c) => pantrySearch = c}/>
                                <button className="search-button" onClick={doSearch}> Search </button>
                                <span id="pantrySearch">{message}</span>
                            </form>
                        </div>
                        <div className="pan-gro-item">
                            <div className="pan-item" id="pan-item">
                                <h1 className='title'>Pantry</h1>
                            </div>
                            <div className="gro-item" id="gro-item">
                                <h1 className='title'>Grocery</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recipe">
                    <div className="recipe-ui">
                        <div className="recipe-header">
                            <h1 className='title'> Recipes </h1>
                        </div>
                        <div className="search">
                            <form className="search">
                                <input className="search-bar" id="recipeSearch" placeholder="Search Recipes" ref={(c) => recipeSearch = c}/>
                                <button className="search-button" onClick={doSearchRecipe}> Search </button>
                                <span id="recipeSearch">{message}</span>
                            </form>
                        </div>
                        <div className="recipe-item">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTitle;
