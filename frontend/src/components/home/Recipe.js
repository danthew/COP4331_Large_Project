import React, { useState } from 'react';

function Recipe()
{
    var recipeSearch = '';
    const [message,setMessage] = useState('');

    const doSearchRecipe = async event =>
    {
        event.preventDefault();
        
        alert('searchRecipe() ' + recipeSearch.value);
    };

    return(
        <div className="recipe">
            <div className="recipe-ui">
                <div className="recipe-header">
                    <h1 className='btnlabel'> Recipes </h1>
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
    );
}

export default Recipe;