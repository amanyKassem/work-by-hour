import React from "react";
import { I18nManager } from "react-native";
import { createStackNavigator, createAppContainer , createDrawerNavigator } from "react-navigation";

import DrawerCustomization from "./DrawerCustomization";
import Language from "../components/Language";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Notifications from "../components/Notifications";
import Category from "../components/Category";
import Charge from "../components/Charge";
import ReCharge from "../components/ReCharge";
import ReChargeWallet from "../components/ReChargeWallet";
import Congrats from "../components/Congrats";
import Orders from "../components/Orders";
import MyAdds from "../components/MyAdds";
import Interests from "../components/Interests";

const drawerCust = (props) => (<DrawerCustomization {...props} />)
const DrawerNavigator = createDrawerNavigator({
    home:Home,
    notifications:Notifications,
    category:Category,
    charge:Charge,
    reCharge:ReCharge,
    reChargeWallet:ReChargeWallet,
    Congrats:Congrats,
    orders:Orders,
    myAdds:MyAdds,
    interests:Interests,

},{
    initialRouteName:'home',
    drawerPosition:I18nManager.isRTL ?'right' : 'left',
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    gesturesEnabled:false,
    drawerToggleRoute:'DrawerToggle',
    contentComponent:drawerCust
})
const AppNavigator = createStackNavigator({

    interests: {
        screen: Interests,
        navigationOptions: {
            header: null
        }
    },
    orders: {
        screen: Orders,
        navigationOptions: {
            header: null
        }
    },
    myAdds: {
        screen: MyAdds,
        navigationOptions: {
            header: null
        }
    },
    drawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    notifications: {
        screen: Notifications,
        navigationOptions: {
            header: null
        }
    },
    reChargeWallet: {
        screen: ReChargeWallet,
        navigationOptions: {
            header: null
        }
    },
    congrats: {
        screen: Congrats,
        navigationOptions: {
            header: null
        }
    },
    ReCharge: {
        screen: ReCharge,
        navigationOptions: {
            header: null
        }
    },
    category: {
        screen: Category,
        navigationOptions: {
            header: null
        }
    },
    charge: {
        screen: Charge,
        navigationOptions: {
            header: null
        }
    },
    register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    language: {
        screen: Language,
        navigationOptions: {
            header: null
        }
    },

});

export default createAppContainer(AppNavigator);