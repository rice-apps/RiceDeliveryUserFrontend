import { createStackNavigator } from "react-navigation"
import { ExampleNavigator } from "./example-navigator"
import { ExampleTabNavigator } from "./example-tab-navigator"

export const RootNavigator = createStackNavigator(
  {
    // this is an example of having multiple navigators being rendered by a single navigator
    // there are multiple types here: stack and tab navigators; navigate to them just as you would navigate
    // to any other screen 
    exampleStack: { screen: ExampleNavigator },
    exampleTab: {screen: ExampleTabNavigator},
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
