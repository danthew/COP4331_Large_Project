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
            <div class="title-Bar">
                <h1 id='title'>RECIPEASY</h1>
                <button onClick={Click} class="text">Click Me</button>
            </div>
            <div class="pan-gro">
                <h1 id='title'>Howdy</h1>
            </div>
            <div class="recipe-List">
                <h1 id='title'>Partner</h1>
            </div>
        </div>
    );
};

export default HomeTitle;