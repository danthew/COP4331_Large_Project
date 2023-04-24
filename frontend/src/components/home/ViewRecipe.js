import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function ViewRecipe() {
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [cookie, setCookie] = useCookies(['userId', 'recipeId', 'ingredientId', 'instructionId']);

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

    const viewRecipes = async () => {

        const recipeId = cookie.recipeId;
        console.log(recipeId);
        console.log(cookie.ingredientId);

        try {
            const response = await fetch(buildPath('api/listRecipeIngredients'), {
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
            const response = await fetch(buildPath('api/listRecipeInstructions'), {
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

    const cancel = async (event) =>
    {
        event.preventDefault();
        window.location.href = "/home";
    }

    return (
        <div className="list-recipes">
            <div className="list-Ingredients">
                <div className="ingred">
                    <label className="ingred">Ingredients</label>
                </div>
                <div className="list-Ing">
                    {ingredients.map((ingredient, index) => (
                    <div className="list-recipeIngredients" key={ingredient.ingredientId}>
                        {ingredient.name.map((name, index) => (
                            <p key={index}>{ingredient.quantity[index]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {name}</p>
                        ))}
                    </div>  
                    ))}
                </div>
            </div>
            <div className="list-Instructions">
                <div className="instru">
                    <label className="instruct">Instructions</label>
                </div>
                <div className="list-Ins">
                {instructions.map((instruction, index) => (
                <div className="list-recipeInstructions" key={instruction.instructionId}>
                    {instruction.body.map((body, index) => (
                        <p key={index}> Step {instruction.stepNumber[index]}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{body}</p>
                    ))}
                </div>
                ))}
                </div>
            </div>
            <div className="modData">
                <input type="submit" id="cancel" className="buttons" value="Edit Recipe" onClick={cancel} />
                <input type="submit" id="cancel" className="buttons" value="Delete Recipe" onClick={cancel} />
            </div>
            <input type="submit" id="cancel" className="buttons" value="Return Home" onClick={cancel} />
        </div>
    );
}

export default ViewRecipe;