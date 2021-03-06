import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
// import { ConfirmOrderScreen } from "../views/example/confirm-order-screen"
import {currentBatchesIcon, pendingOrdersIcon, accountIcon} from "./navigationIcons/icons"

// Login Screen
import LoginScreen  from "../app/screens/login-screen/login-screen"

// Account Stack
import { AccountScreen } from "../app/screens/accountStack/account-setting-screen";
import { AccountInfoScreen } from "../app/screens/accountStack/account-info-screen/account-info-screen";
import { PaymentInfoScreen } from "../app/screens/accountStack/payment-info-screen/payment-info-screen";
import { LocationInfoScreen } from "../app/screens/accountStack/location-info-screen/location-info-screen";
import { ChangePasswordScreen } from "../app/screens/accountStack/change-password-screen/change-password-screen"

// Menu Stack
import { VendorsScreen } from "../app/screens/menuStack/vendors-screen/vendors-screen"
import { SingleVendorMenu } from "../app/screens/menuStack/single-vendor-menu/single-vendor-menu"
import { CartScreen } from "../app/screens/menuStack/cart-screen/cart-screen"
import { CheckoutScreen } from "../app/screens/menuStack/checkout-screen/checkout-screen"
import { CreateAccountScreen } from "../app/screens/login-screen/create-account-screen"

// Order Stack
// import { OrderScreen } from "../app/screens/orderStack/current-order-screen/current-order-screen";
import { OrderHistoryScreen } from "../app/screens/orderStack/order-history-screen/order-history-screen"
import { SingleOrderScreen } from "../app/screens/orderStack/single-order-screen/single-order-screen"
import { OrderScreen } from "../app/screens/orderStack/current-order-screen/current-order-screen"
import { FAQScreen } from "../app/screens/accountStack/faq-screen/faq-screen";


// Stack Navigator for Account Stack
const accountStackNavigator = createStackNavigator({
    Account: { 
      screen: AccountScreen,
      navigationOptions: {
        title: "Account Settings",
        },
    },
    AccountInfo : {
        screen: AccountInfoScreen,
        navigationOptions: {
            title: "Account Info",
        },
    },
    PaymentInfo : {
        screen: PaymentInfoScreen,
        navigationOptions: {
            title: "Payment Info",
        },
    },
    LocationInfo : {
        screen: LocationInfoScreen,
        navigationOptions: {
        title: "Location Info",
        },
    },
    ChangePassword : {
        screen: ChangePasswordScreen,
        navigationOptions: {
            title: "Password",
        },
    },
    FAQ : {
        screen: FAQScreen,
        navigationOptions: {
            title: "FAQ",
        },
    },
});

// Stack Navigator for Menu Stack
const menuStackNavigator = createStackNavigator({
    Menu: { 
      screen: VendorsScreen,
      navigationOptions: {
        // title: "Vendors",
        },
    },
    SingleVendorMenu: {
        screen: SingleVendorMenu,
        navigationOptions: {
            // title: "Menu",
            },
    },
    Cart : {
        screen: CartScreen,
        navigationOptions: {
            // title: "Cart",
            },
    },
    Checkout : {
        screen: CheckoutScreen,
        navigationOptions: {
            // title: "Checkout",
            },
    },
    
})

// Stack Navigator for Order Stack
const orderStackNavigator = createStackNavigator({
    OrderHistory : {
        screen: OrderHistoryScreen,
        navigationOptions: {
            title: "Order History",
        },
    },
    Order: {
        screen: OrderScreen,
        navigationOptions: {
        //   title: "Order",
          },
      },
    SingleOrder : {
        screen: SingleOrderScreen,
        navigationOptions: {
            // title: "Single Order",
            },    
    },
})

// Tab Navigator for App
export const TabNavigator = createBottomTabNavigator({
    Menu: {
        screen: menuStackNavigator,
        navigationOptions: {
           tabBarIcon: pendingOrdersIcon, 
        //    title: "Menu",
         },      
    },
    Order: {
        screen: orderStackNavigator,
        navigationOptions: {
        tabBarIcon: currentBatchesIcon, 
        // title: "Order History",
        },      
    },
    Account: {
        screen: accountStackNavigator,
        navigationOptions: {
        tabBarIcon: accountIcon, 
        // title: "Account",
        },      
    },
  },
  {initialRouteName: "Order"},
  )


export const RootNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen,
    }, 
    CreateAccount: {
        screen: CreateAccountScreen,
    },
    Tabs: {
      screen: TabNavigator, 
      navigationOptions: {
        gesturesEnabled: false,
    },
    },
  }, 
  {
    mode: "modal", 
    initialRouteName: "Login", 
    headerMode: "none",
},
)
