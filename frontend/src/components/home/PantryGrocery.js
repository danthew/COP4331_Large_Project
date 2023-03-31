import React, { useState } from 'react';

function PantryGrocery()
{
    var pantrySearch = '';
    const [message,setMessage] = useState('');

    const doSearch = async event =>
    {
        event.preventDefault();
        
        alert('search() ' + pantrySearch.value);
    };

    const panButton = async event =>
    {
        event.preventDefault();
        document.getElementById("pan-item").style.display = "block";
        document.getElementById("gro-item").style.display = "none";
        document.getElementById("addGro").style.display = "none";
        document.getElementById("addPan").style.display = "block";

        //alert('pantry()');
    };

    const groButton = async event =>
    {
        event.preventDefault();
        document.getElementById("pan-item").style.display = "none";
        document.getElementById("gro-item").style.display = "block";
        document.getElementById("addGro").style.display = "block";
        document.getElementById("addPan").style.display = "none";

        //alert('grocery()');
    };

    const addPan = async event =>
    {
        event.preventDefault();

        alert('addPan()');
    }

    const addGro = async event =>
    {
        event.preventDefault();

        alert('addGro()');
    }

    return(
        <div className="pan-gro">
            <div className="pan-gro-ui">
                <div className="pan-button" onClick={panButton}>
                    <h1 className='btnlabel'> Pantry </h1>
                </div>
                <div className="gro-button" onClick={groButton}>
                    <h1 className='btnlabel'> Grocery List </h1>
                </div>
                <div className="search">
                    <form className="search">
                        <button className="add-pan" id='addPan' onClick={addPan}>+</button>
                        <button className="add-gro" id='addGro' onClick={addGro}>+</button>
                        <input className="search-bar" id="pantrySearch" placeholder="Search Pantry/Grocery List" ref={(c) => pantrySearch = c}/>
                        <button className="search-button" onClick={doSearch}> Search </button>
                        <span id="pantrySearch">{message}</span>
                    </form>
                </div>
                <div className="pan-gro-item">
                    <div className="pan-item" id="pan-item">
                        <h1>Pantry</h1>
                    </div>
                    <div className="gro-item" id="gro-item">
                        <h1>Grocery</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PantryGrocery;