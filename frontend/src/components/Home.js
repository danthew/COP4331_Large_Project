import React, { useState } from 'react';

function HomeTitle()
{
    var pantrySearch = '';

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
                <h1 id='title'>RECIPEASY</h1>
                <div className="setting-button">
                    <button onClick={Click} className="text">SETTING BUTTON</button>
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
                                <input className="search-bar" id="pantrySearch" placeholder="Search Pantry" ref={(c) => pantrySearch = c}/>
                                <button className="search-button" onClick={doSearch}> + </button>
                                <span id="pantrySearch">{message}</span>
                            </form>
                        </div>
                        <div className="pan-gro-item">
                            <div className="pan-item" id="pan-item">
                                <h1 className='title'>butt</h1>
                            </div>
                            <div className="gro-item" id="gro-item">
                                <h1 className='title'>hole</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recipe">
                    <div className="recipe-ui">
                        <div className="recipe-header">
                            <h1 className='title'> Recipes </h1>
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
