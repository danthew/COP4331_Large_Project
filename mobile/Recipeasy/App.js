import React from 'react';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import AppNavigator from './Navigator';

/* UserContext Component */
import { UserProvider } from './UserContext';

export default ()=> (
    <UserProvider>
        <AppNavigator />
    </UserProvider>
);
