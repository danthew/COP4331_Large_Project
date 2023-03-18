import React from 'react';

function HomeTitle()
{
    const Click = async event =>
    {
        event.preventDefault();
        
        alert('doIt()');
    };

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

                </div>
                <div class="recipe">
                    
                </div>
            </div>
        </div>
    );
};

export default HomeTitle;