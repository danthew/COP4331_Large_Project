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

    const addRecipe = async event =>
    {
        event.preventDefault();

        alert('addRecipe()');
    }

    return(
        <div className="recipe">
            <div className="recipe-ui">
                <div className="recipe-header">
                    <h1 className='label'> Recipes </h1>
                </div>
                <div className="search">
                    <form className="search">
                        <button className="add-Recipe" id='addRecipe' onClick={addRecipe}>+</button>
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