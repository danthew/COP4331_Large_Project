import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

function Recipe()
{
    var recipeSearch = '';
    const [message,setMessage] = useState('');
    const [cookie, setCookie] = useCookies(['userId']);

    const doSearchRecipe = async event =>
    {
        event.preventDefault();
        
        alert('searchRecipe() ' + recipeSearch.value);
    };

    const addRecipe = async event =>
    {
        event.preventDefault();

        window.location.href = "/addRecipe";
    }

    const listRecipes = () => {

        const userId = cookie.userId;

        fetch('http://localhost:5001/recipeasy-ec759/us-central1/api/listRecipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        .then(response => response.json())
        .then(data => {
        if (data.length === 0) {
            console.log('No recipes found for this user.');
            return;
        }
        data.forEach(recipe => {
        console.log('Recipe ID:', recipe.recipeId);
        console.log('Recipe Name:', recipe.name);
        console.log('Ingredients:', recipe.ingredients);
        console.log('Instructions:', recipe.instructions);
        console.log('---');
    });
  })
  .catch(error => console.error(error));

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
                    <h1>{listRecipes()}</h1>
                    
                </div>
            </div>
        </div>
    );
}

export default Recipe;
