import React, { useState } from "react";
import { useCookies } from 'react-cookie';

function AddRecipe() {

    const [ingredientList, setingredientList] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const[stepsList, setstepsList] = useState([]);
    const[number, setNumber] = useState([]);
    const [message, setMessage] = useState("");
    const [cookie, setCookie] = useCookies(['userId', 'recipeId', 'ingredientId']);

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

        const addField=()=> { 
        const iL=[...ingredientList, []];
        setingredientList(iL);
        const qL=[...quantity, []];
        setQuantity(qL);
    }
    const handleRemove=(index)=>{
        const list=[...ingredientList];
        list.splice(index, 1);
        setingredientList(list);
        const list2=[...quantity];
        list2.splice(index, 1);
        setQuantity(list2);
    }
    const handleinputchange=(e, index)=> {
        const inputData=[...ingredientList];
        inputData[index]=e.target.value;
        setingredientList(inputData);
    }
    const handleinputchangeQ=(e, index)=> {
        const inputData=[...quantity];
        inputData[index]=e.target.value;
        setQuantity(inputData);
    }

    const addStep=()=>{
        const abc=[...stepsList, []];
        setstepsList(abc);
    }
    const removeStep=(index)=>{
        const list=[...stepsList];
        list.splice(index, 1);
        setstepsList(list);
    }
    const handleStepChange=(e, index)=> {
        const inputData=[...stepsList];
        inputData[index]=e.target.value;
        setstepsList(inputData);
        const ip=[...number];
        ip[index]=index+1;
        setNumber(ip);
    }
    const handleClick=(cb)=>{
        console.log(cb.checked);
    }
    //console.log(ingredientList, 'data-');

    const addRecipe = async (event) =>{

        event.preventDefault();

        let obj = {
            name: name.value,
            cuisine: cuisine.value,
            cookTime: cookTime.value, 
            prepTime: prepTime.value,
            allowSubs: "false",
            userId: cookie.userId
        };

        let obj2 = {
            name: ingredientList,
            quantity: quantity,
            recipeId: cookie.recipeId
        }

        let obj3 = {
            body: stepsList,
            stepNumber: number,
            recipeId: cookie.recipeId
        }

        let js = JSON.stringify(obj); 
        console.log(JSON.stringify(obj,null,2));

        let js2 = JSON.stringify(obj2);


        let js3 = JSON.stringify(obj3);
        console.log(JSON.stringify(obj3,null,2));


        try {
            const response = await fetch(buildPath('api/addRecipe'), {
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
                setCookie('recipeId', res.recipeId, {path: '/'});
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
        try {
            const response = await fetch(buildPath('api/addIngredientToRecipe'), {
                method: "POST",
                body: js2,
                headers: { Accept: 'application/json',
                    "Content-Type": "application/json" },
            });
            if(response.status != 201) {
                setMessage('There was an error with your recipe input.');
		        console.log(response.status);
            }
            else {
                var res2 = JSON.parse(await response.text());
                setCookie(' ingredientId', res2.ingredientId, {path: '/'});
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
        try {
            const response = await fetch(buildPath('api/addInstruction'), {
                method: "POST",
                body: js3,
                headers: { Accept: 'application/json',
                    "Content-Type": "application/json" },
            });
            if(response.status != 201) {
                setMessage('There was an error with your recipe input.');
		        console.log(response.status);
            }
            else {
                var res3 = JSON.parse(await response.text());
                setCookie('instructionId', res3.instructionId, {path: '/'});
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
                    <input className="recipe-title" size="10" id="name" placeholder="Title" ref={(c) => name = c}/>
                </div>
                <div className="add-Ing">
                    <hr color="#337AB7" size="5" width="100%"></hr>
                    {ingredientList.map((data, i)=> {
                        return(
                            <div class="ingredients">
                                    <form>
                                        <label>Quantity :</label>
                                        <input className="quantity" size="5" onChange={ e =>handleinputchangeQ(e, i)}></input>
                                        <label>Ingredient :</label>
                                        <input className="ingredient" size="15" onChange={ e =>handleinputchange(e, i)}></input> 
                                        <button className="X" onClick={()=>handleRemove(i)}>x</button>  
                                    </form>
                            </div>
                        );  
                    })}
                    <hr color="#337AB7" size="5" width="100%"></hr>
                    <button className="btn btn-add" onClick={()=>addField()}>Add Ingredient</button>             
                </div>
                <div className="cook-time">
                    <label className="cook">Cook Time :</label>
                    <input type='number' id='cookTime' placeholder="Cook Time" ref={(c) => cookTime = c}></input> 
                    <label className="time">min</label>
                </div>
                <div className="prep-time">
                    <label>Prep Time :</label>
                    <input type='number' id='prepTime' placeholder="Prep Time" ref={(c) => prepTime = c}></input> 
                    <label className="time">min</label>
                </div>
                <div className="cuisine">
                    <label>Cuisine :</label>
                    <input type='text' id='cuisine' placeholder="Cuisine" ref={(c) => cuisine = c}></input> 
                </div>
                <div class="add-delete">
                    <hr color="#337AB7" size="5" width="100%"></hr>
                    {stepsList.map((data, i)=> {
                        return (
                            <div className="ingredients">
                                <div className="addStep">
                                    <label>Steps</label>
                                    <input className="step" value={data} onChange={ e =>handleStepChange(e,i)}></input>
                                    <button className="X" onClick={()=>removeStep(i)}>x</button>  
                                </div>
                            </div>
                        );
                    })}
                    <hr color="#337AB7" size="5" width="100%"></hr>
                    <button className="btn-add" onClick={()=>addStep()}>Add Step</button>
                </div>
                <input type="submit" id="addRecipeButton" className="buttons" value="AddRecipe" onClick={addRecipe}/>
                <input type="submit" id="cancel" className="buttons" value="Cancel" onClick={cancel} />
                <span id="addRecipeResult">{message}</span>
            </div>
        </div>
    )
}

export default AddRecipe;