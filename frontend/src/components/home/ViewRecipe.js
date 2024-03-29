import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function ViewRecipe() {
    const [message, setMessage] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [cookie, setCookie] = useCookies(['userId', 'recipeId', 'ingredientId', 'instructionId', 'name', 'cuisine', 'prepTime', 'cookTime']);

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

    const edit = async =>
    {
        window.location.href = "/editRecipe"
    }

    const cancel = async (event) =>
    {
        event.preventDefault();
        window.location.href = "/home";
    }

    const deleteRecipe = async (event) =>
    {
        event.preventDefault();

        const recipeId = cookie.recipeId;
        console.log(recipeId)

        try{
            const response = await fetch(buildPath('api/deleteRecipe'), {
                method: 'DELETE',
                body: JSON.stringify({ recipeId }),
                headers: {
                  'Content-Type': 'application/json',
                },
            });

            var res = JSON.parse(await response.text());

            if(res.id <= 0)
            {
                setMessage('Can not delete recipe');
            }
            else
            {
                window.location.href = "/home";
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return (
        <div className="view-recipe-block">
            <div className="list-recipes">
                <div className="list-name">
                    <h>{cookie.name}</h>
                </div>
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
                    <input type="submit" id="cancel" class="buttons sub_buttons" value="Edit Recipe" onClick={edit} />
                    <input type="submit" id="deleteRecipe" className="buttons sub_buttons" value="Delete Recipe" onClick={deleteRecipe} />
                </div>
                <input type="submit" id="cancel" className="buttons sub_buttons" value="Return Home" onClick={cancel} />
                <span id="loginResult">{message}</span>
            </div>
        </div>
    );
}

export default ViewRecipe;