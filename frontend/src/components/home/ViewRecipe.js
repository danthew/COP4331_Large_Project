import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function ViewRecipe() {
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [cookie, setCookie] = useCookies(['userId', 'recipeId', 'ingredientId', 'instructionId']);

    const viewRecipes = async () => {

        const recipeId = cookie.recipeId;
        console.log(recipeId);
        console.log(cookie.ingredientId);

        try {
            const response = await fetch('http://localhost:5001/recipeasy-ec759/us-central1/api/listRecipeIngredients', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId }),
            });
            const data = await response.json();
            console.log(data);
            setIngredients(data); // update state variable with fetched data
        } catch (error) {
            console.error(error);
        }
        try {
            const response = await fetch('http://localhost:5001/recipeasy-ec759/us-central1/api/listRecipeInstructions', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId }),
            });
            const data = await response.json();
            console.log(data);
            setInstructions(data); // update state variable with fetched data
        } catch (error) {
            console.error(error);
        }

    }    

    useEffect(() => {
        viewRecipes();
      }, []); // run once on component mount

    return (
        <div className="list-recipes">
            <label>Ingredients</label>
            {ingredients.map((ingredient, index) => (
            <div className="list-recipeIngredients" key={ingredient.ingredientId}>
                {ingredient.name.map((name, index) => (
                    <p key={index}> {name} Quantity: {ingredient.quantity[index]}</p>
                 ))}
            </div>
            ))}
            <label>Instructions</label>
            {instructions.map((instruction, index) => (
            <div className="list-recipeInstructions" key={instruction.instructionId}>
                {instruction.body.map((body, index) => (
                    <p key={index}> Step: {instruction.stepNumber[index]} {body}</p>
                 ))}
                
            </div>
            ))}
        </div>
    );
}
export default ViewRecipe;