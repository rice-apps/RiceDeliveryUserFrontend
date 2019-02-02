import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
// import { ConfirmOrderScreen } from "../views/example/confirm-order-screen"

// Old Screens
// import { CartScreen } from "../views/example/cart-screen"
// import { MenuScreen } from "../views/example/menu-screen"
// import { OrderScreen } from "../views/example/order-screen"

// Login Screen
import LoginScreen  from "../app/screens/login-screen/login-screen";

// Account Stack
import { AccountScreen } from "../app/screens/accountStack/account-setting-screen"

// Menu Stack
import { VendorsScreen } from "../app/screens/menuStack/vendors-screen/vendors-screen";

// Order Stack
import { OrderScreen } from "../app/screens/orderStack/current-order-screen/current-order-screen";
import { MenuScreen } from "../views/example/menu-screen";


const accountStackNavigator = createStackNavigator({
    Account: { 
      screen: AccountScreen,
      navigationOptions: {
        title: 'Account Settings'
        }
    }
});

const menuStackNavigator = createStackNavigator({
    Menu: { 
      screen: VendorsScreen,
      navigationOptions: {
        title: 'Menu'
        }
    }
});

const orderStackNavigator = createStackNavigator({
    Order: { 
      screen: OrderScreen,
      navigationOptions: {
        title: 'Order'
        }
    }
});


export const TabNavigator = createBottomTabNavigator({
    MenuStack: {
        screen: menuStackNavigator,
        navigationOptions: {
           // tabBarIcon: pendingOrdersIcon, 
           title: "Menu"
         }      
    },
    OrderStack: {
        screen: orderStackNavigator,
        navigationOptions: {
        // tabBarIcon: pendingOrdersIcon, 
        title: "Order"
        }      
    },
    AccountStack: {
         screen: accountStackNavigator,
         navigationOptions: {
            // tabBarIcon: pendingOrdersIcon, 
            title: "Account"
          }      
    },
  },
  {initialRouteName: 'OrderStack'}
  );


// export const TabNavigator = createBottomTabNavigator({
    // OrderStack: {
    //   screen: OrdersStackNavigator,
    //   navigationOptions: {
    //     tabBarIcon: pendingOrdersIcon, 
    //     title: "Pending Orders"
    //   }
    // }, 
    // BatchesStack: {
    //   screen: batchStackNavigator,
    //   navigationOptions: {
    //     tabBarIcon: currentBatchesIcon, 
    //     title: 'Current Batches'
    //   }
    // }, 
//     AccountStack: {
//       screen: accountStackNavigator,
//       navigationOptions: {
//         // tabBarIcon: accountIcon,
//         title: "Account"
//       }
//     },
//   },
//     {initialRouteName: 'BatchesStack'}
//   )
  

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
