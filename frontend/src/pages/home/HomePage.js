import React from 'react';

import HomeTitle from 'components/home/TitleBar';
import PantryGrocery from 'components/home/PantryGrocery';
import Recipe from 'components/home/Recipe';

const HomePage = () =>
{
    return(
        <div className='background'>
            <HomeTitle />
            <div className='content'>
                <PantryGrocery />
                <Recipe />
            </div>
        </div>
    );
};

export default HomePage;
