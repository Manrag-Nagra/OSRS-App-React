import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import GrandExchange from '../screens/grandExchange';
import GrandExchangeMoreInfo from '../screens/grandExchangeMoreInfo'



const screens = {
    OSRSTracker: {
        screen: Home
    },
    GrandExchange: {
        screen: GrandExchange
    },
    GrandExchangeMoreInfo: {
        screen: GrandExchangeMoreInfo
    },
}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);