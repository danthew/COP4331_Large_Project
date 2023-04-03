import React, { useState } from "react";
import { Container } from 'react-bootstrap';

function AddRecipe() {

    const [ingredientList, setingredientList] = useState([{ingredient:"", quantity:""}]);
    const[stepsList, setstepsList] = useState([]);
    const [message, setMessage] = useState("");

    var name;
    var cookTime;
    var cuisine;
    var prepTime;
    var addSubs;

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

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

    const addRecipe = async (event) =>{

        event.preventDefault();

        let obj = {
            name: name.value,
            cuisine: cuisine.value,
            cookTime: cookTime.value, 
            prepTime: prepTime.value,
            addSubs: addSubs.value,
            userId: userId
        };

        let js = JSON.stringify(obj);
        console.log(JSON.stringify(obj,null,2));

        try {
            const response = await fetch('http://localhost:5001/recipeasy-ec759/us-central1/api/addRecipe', {
                method: "POST",
                body: js,
                headers: { Accept: 'application/json',
                    "Content-Type": "application/json" },
            });

            var res = JSON.stringify(response.body);
            if(response.status != 201) {
                setMessage('There was an error with your recipe input.');
		        console.log(response.status);
            }
            else {
                var recipe = {
                    RecipeId: res.id
                };
                localStorage.setItem('user_data', JSON.stringify(recipe));
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


    

    const addField=()=> { 
        setingredientList([...ingredientList, {ingredient:"", quantity:""}]);
    }
    const handleRemove=(index)=>{
        const list=[...ingredientList];
        list.splice(index, 1);
        setingredientList(list);
    }
    const handleinputchange=(e, index)=> {
        const {name, value}=e.target;
        const onChangeVal = [...ingredientList];
        onChangeVal[index][name]=value;
        setingredientList(onChangeVal);
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
    }
    //console.log(ingredientList, 'data-');
    console.log(stepsList,"data-");



    return (
        <Container className="content">
        <div className="background">
        <form onSubmit={addRecipe}>
            <div className="title-bar"> 
                <h1 className='title'>Add a Recipe</h1>
            </div>
            <div className="title">
                <h1 className='title'>Give your recipe a title!</h1>
                <input className="recipe-title" id="name" placeholder="Title" ref={(c) => name = c}/>
            </div>           
            <div class="addIng">
                {ingredientList.map((data, i)=> {
                    return(
                        <div class="ingredients">
                                <label>Ingredient</label>
                                <input name="ingredient" onChange={ e =>handleinputchange(e, i)}></input> 
                                <label>Quantity</label>
                                <input  name="quantity"onChange={ e =>handleinputchange(e, i)}></input>
                                <button onClick={()=>handleRemove(i)}>x</button>  
                                

                        </div>
                    );
                    
                })}
                <button className="btn btn-add" onClick={()=>addField()}>Add Ingredient</button>
                <p>{JSON.stringify(ingredientList)}</p>
                
            </div>
            <div class="cook-time">
                <label>Cook Time</label>
                <input type='number' id='cookTime' placeholder="Cook Time" ref={(c) => cookTime = c}></input> 
            </div>
            <div class="prep-time">
                <label>Prep Time</label>
                <input type='number' id='prepTime' placeholder="Prep Time" ref={(c) => prepTime = c}></input> 
            </div>
            <div class="cuisine">
                <label>Cuisine</label>
                <input type='text' id='cuisine' placeholder="Cuisine" ref={(c) => cuisine = c}></input> 
            </div>
            <div class="addsubs">
                <label>Add substitutions</label>
                <input type='checkbox' checked='checked' id='addSubs' ref={(c) => addSubs = c}></input> 
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
            </form>
            <span id="addRecipeResult">{message}</span>
        </div>
        </Container>
    )
}

export default AddRecipe;