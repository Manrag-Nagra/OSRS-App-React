import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import GrandExchange from '../screens/grandExchange';


const screens = {
    OSRSTracker: {
        screen: Home
    },
    GrandExchange: {
        screen: GrandExchange
    }
}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);