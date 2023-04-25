
import { buildPath } from 'components/BuildPath';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [cookie, setCookie] = useCookies(['userId']);

  function buildPath(route)
	{
		if (process.env.NODE_ENV === 'production')
		{
		return 'https://us-central1-recipeasy-ec759.cloudfunctions.net/' + route;
		}
		else
		{
		return 'http://localhost:5001/recipeasy-ec759/us-central1/' + route;
		}
	}

    var recipeSearch = '';
    const [message,setMessage] = useState('');

    const doSearchRecipe = async event =>
    {
        event.preventDefault();
        
        const userId = cookie.userId;
        console.log(userId);
      
        try {
          const response = await fetch(buildPath('api/listRecipes'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, searchCriteria: recipeSearch.value }),
          });
          const data = await response.json();
      
          if (recipeSearch.value === '') {
            setRecipes(data); // update state variable with all recipes
          } else {
            setRecipes(data.filter(recipe => recipe.name.includes(recipeSearch.value))); // update state variable with filtered recipes
          }
      
        } catch (error) {
          console.error(error);
        }
    };

    const addRecipe = async event =>
    {
        event.preventDefault();

        window.location.href = "/addRecipe";
    }

    const viewRecipe = async recipeId => {
	setCookie('recipeId', recipeId, {path: '/'});
      	window.location.href = `/viewRecipe`;
    };

    const listRecipes = async () => {
        const userId = cookie.userId;
        console.log(userId);
      
        try {
          const response = await fetch(buildPath('api/listRecipes'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, searchCriteria: recipeSearch.value }),
          });
          const data = await response.json();
      
          if (recipeSearch.value === '') {
            setRecipes(data); // update state variable with all recipes
          } else {
            setRecipes(data.filter(recipe => recipe.name.includes(recipeSearch.value))); // update state variable with filtered recipes
          }
      
        } catch (error) {
          console.error(error);
        }
      };

  useEffect(() => {
    listRecipes();
  }, []); // run once on component mount

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
              <button onClick={() => viewRecipe(recipe.recipeId)}>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
