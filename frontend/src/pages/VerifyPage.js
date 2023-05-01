import React from 'react';

import VPage from 'components/VerificationPage';
import HomeTitle from 'components/home/TitleBar';

const VerifyPage = () =>
{
    return(
        <div className="background">
            <HomeTitle />
            <div className="content">
                <VPage />
            </div>
        </div>
    );
};

export default VerifyPage;