import { createBottomTabNavigator } from "react-navigation"
import { CartScreen } from "../views/example/cart-screen"
// import { ConfirmOrderScreen } from "../views/example/confirm-order-screen"
import { MenuScreen } from "../views/example/menu-screen"
import { OrderScreen } from "../views/example/order-screen"

export const BottomDrawerNavigator = createBottomTabNavigator({
  Menu: { screen: MenuScreen },
  Cart: { screen: CartScreen },
  Order: { screen: OrderScreen },
});
