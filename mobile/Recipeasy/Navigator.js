import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Grocery from './screens/GroceryList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Grocery List" component={Grocery} />
        </Tab.Navigator>
    );
}

const { Navigator, Screen } = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = ()=> (
    <NavigationContainer>
        <Navigator 
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}>
            
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
            <Screen name="Home" component={HomeNavigator} />
            <Screen name="Grocery List" component={Grocery}/>
        </Navigator>
    </NavigationContainer>
);

export default AppNavigator;
