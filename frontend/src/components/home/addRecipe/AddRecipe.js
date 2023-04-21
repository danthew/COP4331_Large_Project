import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import Logo from 'images/logo.png';

function AddRecipe() {

    const [ingredientList, setingredientList] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const[stepsList, setstepsList] = useState([]);
    const[number, setNumber] = useState([]);
    const [message, setMessage] = useState("");
    const [cookie, setCookie] = useCookies(['userId', 'recipeId', 'ingredientId']);
    const [allowSubs, setallowSubs] = useState([]);

    var name;
    var cookTime;
    var cuisine;
    var prepTime;

    const app_name = 'recipeasy123'
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
	    
	if(obj.name === "" || obj.cuisine === "" || obj.cookTime === "" || obj.prepTime === "") {
            setMessage("Please make sure the fields are not empty.");
            return;
        }


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

    return (
        <div className="background">
            <div className="title">
                <div className="text"> 
                    <h1 className='title'>recipeasy</h1> 
                 
                </div>
                <div className ="logo">  
                        <img height="40px" width="40px" src={Logo} alt="RECIPEASY Logo"></img>
                </div> 
            </div>
            <div class="add-recipe">
            <div className="rec-title">
                <label>Recipe Title</label>
                <input className="recipe-title" id="name" placeholder="Title" ref={(c) => name = c}/>
            </div>           
            <div class="add-Ing">
                <hr color="#337AB7" size="5" width="100%"></hr>
                {ingredientList.map((data, i)=> {
                    return(
                        <div class="ingredients">
                                
                                <label>Ingredient</label>
                                <input name="ingredient" onChange={ e =>handleinputchange(e, i)}></input> 
                                <label>Quantity</label>
                                <input  name="quantity"onChange={ e =>handleinputchangeQ(e, i)}></input>
                                <button onClick={()=>handleRemove(i)}>x</button>  
                        </div>
                    );  
                })}
                <button className="btn btn-add" onClick={()=>addField()}>Add Ingredient</button>             
            </div>
            <div class="cook-time">
                <hr color="#337AB7" size="5" width="100%"></hr>
                <label>Cook Time</label>
                <input type='number' id='cookTime' placeholder="Cook Time" ref={(c) => cookTime = c}></input> 
            </div>
            <div class="prep-time">
                <hr color="#337AB7" size="5" width="100%"></hr>
                <label>Prep Time</label>
                <input type='number' id='prepTime' placeholder="Prep Time" ref={(c) => prepTime = c}></input> 
            </div>
            <div class="cuisine">
                <label>Cuisine</label>
                <input type='text' id='cuisine' placeholder="Cuisine" ref={(c) => cuisine = c}></input> 
            </div>
            <div class="add-delete">                       
                {stepsList.map((data, i)=> {
                    return (
                        <div class="ingredients">
                            <div class="addStep">
                                <label>Steps</label>
                                <input value={data} onChange={ e =>handleStepChange(e,i)}></input>
                                <button onClick={()=>removeStep(i)}>x</button>  
                            </div>
                        </div>
                    );
                })}
                <button className="btn btn-add" onClick={()=>addStep()}>Add Step</button>
            </div>
            <input type="submit" id="addRecipeButton" className="buttons" value="AddRecipe" onClick={addRecipe}/>
            <span id="addRecipeResult">{message}</span>
            </div>
        </div>
    )
}

export default AddRecipe;
