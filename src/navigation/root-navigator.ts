import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
// import { ConfirmOrderScreen } from "../views/example/confirm-order-screen"
import {currentBatchesIcon, pendingOrdersIcon, accountIcon} from './navigationIcons/icons'

// Login Screen
import LoginScreen  from "../app/screens/login-screen/login-screen";

// Account Stack
import { AccountScreen } from "../app/screens/accountStack/account-setting-screen";
import { AccountInfoScreen } from "../app/screens/accountStack/account-info-screen/account-info-screen";
import { PaymentInfoScreen } from "../app/screens/accountStack/payment-info-screen/payment-info-screen";
import { LocationInfoScreen } from "../app/screens/accountStack/location-info-screen/location-info-screen";

// Menu Stack
import { VendorsScreen } from "../app/screens/menuStack/vendors-screen/vendors-screen";
import { SingleVendorMenu } from "../app/screens/menuStack/single-vendor-menu/single-vendor-menu";

// Order Stack
import { OrderScreen } from "../app/screens/orderStack/current-order-screen/current-order-screen";
import { OrderHistoryScreen } from "../app/screens/orderStack/order-history-screen/order-history-screen";


const accountStackNavigator = createStackNavigator({
    Account: { 
      screen: AccountScreen,
      navigationOptions: {
        title: 'Account Settings'
        }
    },
    AccountInfo : {
        screen: AccountInfoScreen,
        navigationOptions: {
            title: 'Account Info'
        }
    },
    PaymentInfo : {
        screen: PaymentInfoScreen,
        navigationOptions: {
            title: 'Payment Info'
        }
    },
    LocationInfo : {
        screen: LocationInfoScreen,
        navigationOptions: {
            title: 'Location Info'
        }
    },
});

const menuStackNavigator = createStackNavigator({
    Menu: { 
      screen: VendorsScreen,
      navigationOptions: {
        title: 'Menu'
        }
    },
    SingleVendorMenu: {
        screen: SingleVendorMenu,
        navigationOptions: {
            title: 'Single Vendor Menu'
            }
        }
});

const orderStackNavigator = createStackNavigator({
    Order: {
      screen: OrderScreen,
      navigationOptions: {
        title: 'Order'
        }
    },
    OrderHistory : {
        screen: OrderHistoryScreen,
        navigationOptions: {
            title: 'Order History'
        }
    },
});


export const TabNavigator = createBottomTabNavigator({
    MenuStack: {
        screen: menuStackNavigator,
        navigationOptions: {
           tabBarIcon: pendingOrdersIcon, 
           title: "Menu"
         }      
    },
    OrderStack: {
        screen: orderStackNavigator,
        navigationOptions: {
        tabBarIcon: currentBatchesIcon, 
        title: "Order"
        }      
    },
    AccountStack: {
        screen: accountStackNavigator,
        navigationOptions: {
        tabBarIcon: accountIcon, 
        title: "Account"
        }      
    },
  },
  {initialRouteName: 'OrderStack'}
  );


export const RootNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen
    }, 
    Tabs: {
      screen: TabNavigator, 
    }
  }, 
  {
    mode: 'modal', 
    initialRouteName: 'Login', 
    headerMode: 'none'
})
