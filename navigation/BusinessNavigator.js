import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Home from '../screens/Home'
import Details from '../screens/Details';

const HomeStack = createStackNavigator({
    Home,
    Details
})

export default createAppContainer(HomeStack)