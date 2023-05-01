import { classBody } from "@babel/types";
import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

function EditRecipe() {

    const [ingredientList, setingredientList] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const[stepsList, setstepsList] = useState([]);
    const[number, setNumber] = useState([]);
    const [message, setMessage] = useState("");
    const [cookie, setCookie] = useCookies(['userId', 'recipeId', 'ingredientId', 'name', 'cuisine', 'prepTime', 'cookTime']);
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [temp, setTemp] = useState([]);

    var name;
    var cookTime;
    var cuisine;
    var prepTime;

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

    const addField = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };
      
    const handleRemove = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };
      
      const handleInputChange = (e, index, field) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = e.target.value;
        setIngredients(newIngredients);
    };

    const addStep=()=>{
        setInstructions([...instructions, '']);
        setstepsList([...stepsList, instructions.length + 1]);
    }
    const removeStep=(index)=>{
        const list = [...instructions];
        list.splice(index, 1);
        setInstructions(list);
        setstepsList(stepsList.filter((step) => step !== index + 1).map((step, i) => i + 1));
    }
    const handleStepChange= async (e, index)=> {
        const inputData = [...instructions];
        inputData[index] = e.target.value;
        setInstructions(inputData);
    }
    //console.log(ingredientList, 'data-');
    const getRecipes = async () => {

        const recipeId = cookie.recipeId;
        console.log(recipeId);

        try {
            const response = await fetch(buildPath('api/listRecipeIngredients'), {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId }),
            });
            const data = await response.json();
            const names = data.map(step => step.name).flat();
            const quantities = data.map(step => step.quantity).flat();
            const newIngredients = names.map((name, index) => ({ name, quantity: quantities[index] }));
            setIngredients(newIngredients);
            const ingredientId = data[0].ingredientId;
            console.log(ingredientId);
            setCookie('ingredientId', ingredientId, { path: '/' });
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

            const bodyArray = data.map(step => step.body).flat();
            setInstructions(bodyArray);

            const instructionId = data[0].instructionId;
            setCookie('instructionId', instructionId, { path: '/' });
    
            // Additional code to display the instructionId in the console
            console.log(`instructionId: ${instructionId}`);
            
            
        } catch (error) {
            console.error(error);
        }

    }    

    useEffect(() => {
      getRecipes();
    }, []); // run once on component mount

    const editRecipe = async (event) =>{

        event.preventDefault();

        let obj = {
            recipeId: cookie.recipeId,
            name: name.value,
            cuisine: cuisine.value,
            cookTime: cookTime.value, 
            prepTime: prepTime.value,
            allowSubs: "false",
            userId: cookie.userId
        };

        let js = JSON.stringify(obj); 
        console.log(JSON.stringify(obj,null,2));


        try {
            const response = await fetch(buildPath('api/editRecipe'), {
                method: "POST",
                body: js,
                headers: { Accept: 'application/json',
                    "Content-Type": "application/json" },
            });
            if(response.status != 201) {
                setMessage('There was an error with your recipe input.');
		        console.log(response.status);
            }
            else {
                var res = JSON.parse(await response.text());
                console.log(cookie, 'data-');
                setMessage('');
            }
        }
        catch(e)
        {
            alert(e.toString());
            console.log(e);
            return;
        }

        console.dir(ingredients);

        

        let obj2 = {
            ingredientId: cookie.ingredientId,
            name: ingredients.map(ingredient => ingredient.name),
            quantity: ingredients.map(ingredient => ingredient.quantity),
            recipeId: cookie.recipeId
        }

        let js2 = JSON.stringify(obj2);
        console.log(JSON.stringify(obj2,null,2));

        try {
            const response = await fetch(buildPath('api/editIngredientInRecipe'), {
                method: "POST",
                body: js2,
                headers: { Accept: 'application/json',
                    "Content-Type": "application/json" },
            });
            if(response.status != 200) {
                setMessage('There was an error with your recipe input.');
		        console.log(response.status);
            }
            else {
                var res2 = JSON.parse(await response.text());
                setMessage('');
            }
        }
        catch(e)
        {
            alert(e.toString());
            console.log(e);
            return;
        }

        let obj3 = {
            instructionId: cookie.instructionId,
            body: instructions,
            stepNumber: stepsList,
            recipeId: cookie.recipeId
        }

        let js3 = JSON.stringify(obj3);
        console.log(JSON.stringify(obj3,null,2));

        try {
            const response = await fetch(buildPath('api/editInstruction'), {
                method: "POST",
                body: js3,
                headers: { Accept: 'application/json',
                    "Content-Type": "application/json" },
            });
            if(response.status != 200) {
                setMessage('There was an error with your recipe input.');
		        console.log(response.status);
            }
            else {
                var res3 = JSON.parse(await response.text());
                setMessage('');
                window.location.href = "/home";
            }
        }
        catch(e)
        {
            alert(e.toString());
            console.log(e);
            return;
        }
    }

    const cancel = async (event) =>
    {
        event.preventDefault();
        window.location.href = "/home";
    }

    return (

        <div className="background">
            <div class="add-recipe">
                <div className="rec-title">
                    <label>Recipe Title</label>
                    <input className="recipe-title" size="10" id="name" defaultValue={cookie.name} ref={(c) => name = c}/>
                </div>
                <div className="add-Ing">
                    <hr size="5" width="100%"></hr>
                    {ingredients.map((data, i) => {
                    return (
                        <div className="ingredients" key={i}>
                            <form>
                                <label>Quantity:</label>
                                <input
                                    className="quantity"
                                    value={data.quantity}
                                    size="5"
                                    onChange={(e) => handleInputChange(e, i, 'quantity')}
                                ></input>
                                <label>Ingredient:</label>
                                <input
                                    className="ingredient"
                                    value={data.name}
                                    size="15"
                                    onChange={(e) => handleInputChange(e, i, 'name')}
                                ></input>
                                <button className="sub_buttons" onClick={() => handleRemove(i)}>
                                x
                                </button>
                            </form>
                        </div>
                    );
                    })}
                    <hr size="5" width="100%"></hr>
                    <button className="btn btn-add sub_buttons" onClick={()=>addField()}>Add Ingredient</button>             
                </div>
                <div className="cook-time">
                    <label className="cook">Cook Time :</label>
                    <input type='number' id='cookTime' defaultValue={cookie.cookTime} ref={(c) => cookTime = c}></input> 
                    <label className="time">min</label>
                </div>
                <div className="prep-time">
                    <label>Prep Time :</label>
                    <input type='number' id='prepTime' defaultValue={cookie.prepTime} ref={(c) => prepTime = c}></input> 
                    <label className="time">min</label>
                </div>
                <div className="cuisine">
                    <label>Cuisine :</label>
                    <input type='text' id='cuisine' defaultValue={cookie.cuisine} ref={(c) => cuisine = c}></input> 
                </div>

                <div className="add-delete">
                    <hr size="5" width="100%" />
                    {instructions.map((step, i) => (
                    <div className="ingredients" key={i}>
                        <div className="addStep">
                            <input
                                className="step"
                                value={step}
                                onChange={(e) => handleStepChange(e, i)}
                            />
                             <button className="sub_buttons" onClick={() => removeStep(i)}>x</button>
                        </div>
                    </div>
                    ))}
                    <hr size="5" width="100%" />
                    <button className="btn-add sub_buttons" onClick={() => addStep()}>Add Step</button>
                    </div>
                    <input type="submit" id="addRecipeButton" className="buttons sub_buttons" value="Add Recipe" onClick={editRecipe}/>
                    <input type="submit" id="cancel" className="buttons sub_buttons" value="Cancel" onClick={cancel} />
                    <span id="addRecipeResult">{message}</span>
                </div>
            </div>
    )
}

export default EditRecipe;
