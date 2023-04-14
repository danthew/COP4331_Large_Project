import React, { useState } from 'react';

function AddRecipe() {
    let recipeTitle;
    let recipeIngredients;

    return (
        <div className="background">
            <div className="title-bar"> 
                        <h1 className='title'>Add a Recipe</h1>
            </div>
            <div className="title">
                    <input className="recipe-title" id="recipeTitle" placeholder="Title" ref={(c) => recipeTitle = c}/>
                </div>
        </div>
    );
};

export default AddRecipe;