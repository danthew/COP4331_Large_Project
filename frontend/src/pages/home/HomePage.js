import React from 'react';

import TitleBar from 'components/home/TitleBar';
import PantryGrocery from 'components/home/PantryGrocery';
import Recipe from 'components/home/Recipe';

const HomePage = () =>
{
    return(
        <div className='background'>
            <TitleBar />
            <div className='content'>
                <PantryGrocery />
                <Recipe />
            </div>
        </div>
    );
};

export default HomePage;
