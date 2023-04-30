import React from 'react';

import EditRecipe from 'components/home/EditRecipe';
import HomeTitle from '../components/home/TitleBar';

const EditRecipePage = () =>
{
    return(
        <div>
            <HomeTitle />
            <div className="content">
                <EditRecipe />
            </div>
        </div>
    );
};

export default EditRecipePage;
