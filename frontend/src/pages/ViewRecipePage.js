import React from 'react';

import ViewRecipe from 'components/home/ViewRecipe';
import HomeTitle from 'components/home/TitleBar';

const ViewRecipePage = () =>
{
    return(
        <div className="background">    
            <HomeTitle />
            <div>
                <ViewRecipe />
            </div>
        </div>
    );
};

export default ViewRecipePage;
