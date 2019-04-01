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
import { AddPaymentScreen } from "../app/screens/accountStack/add-payment-screen/add-payment-screen";
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
    AddPayment : {
        screen: AddPaymentScreen,
        navigationOptions: {
            title: 'Add Payment'
        }
    },
    ChangePassword : {
        screen: ChangePasswordScreen,
        navigationOptions: {
            title: "Password",
        },
    },
});

// Stack Navigator for Menu Stack
const menuStackNavigator = createStackNavigator({
    Menu: { 
      screen: VendorsScreen,
      navigationOptions: {
        title: "Vendors",
        },
    },
    SingleVendorMenu: {
        screen: SingleVendorMenu,
        navigationOptions: {
            title: "Menu",
            },
    },
    Cart : {
        screen: CartScreen,
        navigationOptions: {
            title: "Cart",
            },
    },
    Checkout : {
        screen: CheckoutScreen,
        navigationOptions: {
            title: "Checkout",
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
          title: "Order",
          },
      },
    SingleOrder : {
        screen: SingleOrderScreen,
        navigationOptions: {
            title: "Single Order",
            },    
    },
})

// Tab Navigator for App
export const TabNavigator = createBottomTabNavigator({
    MenuStack: {
        screen: menuStackNavigator,
        navigationOptions: {
           tabBarIcon: pendingOrdersIcon, 
           title: "Menu",
         },      
    },
    OrderStack: {
        screen: orderStackNavigator,
        navigationOptions: {
        tabBarIcon: currentBatchesIcon, 
        title: "Order",
        },      
    },
    AccountStack: {
        screen: accountStackNavigator,
        navigationOptions: {
        tabBarIcon: accountIcon, 
        title: "Account",
        },      
    },
  },
  {initialRouteName: "OrderStack"},
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
    },
  }, 
  {
    mode: "modal", 
    initialRouteName: "Login", 
    headerMode: "none",
    navigationOptions: {
        gesturesEnabled: false,
    },
},
)
