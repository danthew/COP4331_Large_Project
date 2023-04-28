import React from 'react';

import AddRecipe from 'components/home/addRecipe/AddRecipe';
import HomeTitle from 'components/home/TitleBar';


const AddRecipePage = () =>
{
    return(
        <div>
            <HomeTitle />
            <div>
                <AddRecipe />
            </div>
        </div>
    );
};

export default AddRecipePage;