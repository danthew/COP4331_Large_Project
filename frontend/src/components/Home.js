import React from 'react';

function HomeTitle()
{
    const Click = async event =>
    {
        event.preventDefault();
        
        alert('settings()');
    };

    const panButton = async event =>
    {
        event.preventDefault();
        document.getElementById("pan-item").style.display = "block";
        document.getElementById("gro-item").style.display = "none";

        //alert('pantry()');
    }

    const groButton = async event =>
    {
        event.preventDefault();
        document.getElementById("pan-item").style.display = "none";
        document.getElementById("gro-item").style.display = "block";

        //alert('grocery()');
    }

    //pan = pantry
    //gro = grocery

    return(
        <div class="background">
            <div class="title-bar"> 
                <h1 id='title'>RECIPEASY</h1>
                <div class="setting-button">
                    <button onClick={Click} class="text">SETTING BUTTON</button>
                </div>
            </div>
            <div class="content"> 
                <div class="pan-gro">
                    <div class="pan-gro-ui">
                        <div class="pan-button" onClick={panButton}>
                            <h1 class='title'>PANTRY</h1>
                        </div>
                        <div class="gro-button" onClick={groButton}>
                            <h1 class='title'>GROCERY</h1>
                        </div>
                        <div class="search">
                            <input type="text" id="search" placeholder="SEARCH"/><br />
                        </div>
                        <div class="pan-gro-item">
                            <div class="pan-item" id="pan-item">
                                <h1 class='title'>butt</h1>
                            </div>
                            <div class="gro-item" id="gro-item">
                                <h1 class='title'>hole</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="recipe">
                    <div class="recipe-ui">
                        <div class="recipe-header">
                            <h1 class='title'>RECIPES</h1>
                        </div>
                        <div class="recipe-item">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTitle;