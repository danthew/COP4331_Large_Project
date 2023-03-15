import React from 'react';

function HomeTitle()
{
    const Click = async event =>
    {
        event.preventDefault();
        
        alert('doIt()');
    };

    return(
        <div>
            <div class="title-Bar">
                <h1 id='title'>RECIPEASY</h1>
                <button onClick={Click} class="App-link">Click Me</button>
            </div>
            <div class="pan-gro">

            </div>
            <div class="recipe-List">

            </div>
        </div>
    );
};

export default HomeTitle;