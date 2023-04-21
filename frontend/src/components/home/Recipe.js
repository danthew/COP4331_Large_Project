import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [cookie, setCookie] = useCookies(['userId']);

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

        window.location.href = "/addRecipe";
    }

  const listRecipes = async () => {
    const userId = cookie.userId;

    try {
      const response = await fetch('http://localhost:5001/recipeasy-ec759/us-central1/api/listRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listRecipes();
  }, []);

  return (
    <div className="recipe">
      <div className="recipe-ui">
        <div className="recipe-header">
          <h1 className="label"> Recipes </h1>
        </div>
        <div className="search">
            <form className="search">
                <button className="add-Recipe" id='addRecipe' onClick={addRecipe}>+</button>
                <input className="search-bar" id="recipeSearch" placeholder="Search Recipes" ref={(c) => recipeSearch = c}/>
                <button className="search-button" onClick={doSearchRecipe}> Search </button>
                <span id="recipeSearch">{message}</span>
            </form>
        </div>
        <div className="recipe-items">
          {recipes.map(recipe => (
            <div className="recipe-item" key={recipe.recipeId}>
              <p>Recipe Name: {recipe.name}</p>
              <p>Recipe Cuisine: {recipe.cuisine}</p>
              <p>Prep Time: {recipe.prepTime}</p>
              <p>Cook Time: {recipe.cookTime}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
