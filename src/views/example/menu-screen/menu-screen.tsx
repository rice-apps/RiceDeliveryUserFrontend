import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, SectionList, TouchableHighlight } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Text } from "../../shared/text"
import { Button } from "../../shared/button"
import { Wallpaper } from "../../shared/wallpaper"
import { Header } from "../../shared/header"
import { color, spacing } from "../../../theme"
import { logoIgnite, heart } from "./"
import { BulletItem } from "../bullet-item"
import { Api } from "../../../services/api"
import { save } from "../../../lib/storage"
import { inject, observer } from "mobx-react"
import { RootStore } from "../../../app/root-store";
import { MenuItem } from "./menu-item"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
}
const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}

export interface MenuScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

/**
 * inject finds root store in mobx state tree
 * observer lets us read things from the store
 */
@inject("rootStore")
@observer
export class MenuScreen extends React.Component<MenuScreenProps, { vendorName: String, vendorMenu: Array<Object> }> {
  constructor(props) {
    super(props);
    let { vendor: vendorArray } = this.props.rootStore.vendorStore;
    let vendor = vendorArray[0];
    let vendorName = vendor.name;
    let vendorMenu = vendor.menu;
    this.state = { vendorName: vendorName, vendorMenu: vendorMenu };
  }

  goBack = () => this.props.navigation.goBack(null)

  demoReactotron = async () => {
    console.tron.log("Your Friendly tron log message")
    console.tron.logImportant("I am important")
    console.tron.display({
      name: "DISPLAY",
      value: {
        numbers: 1,
        strings: "strings",
        booleans: true,
        arrays: [1, 2, 3],
        objects: {
          deeper: {
            deeper: {
              yay: "👾",
            },
          },
        },
        functionNames: function hello() { },
      },
      preview: "More control with display()",
      important: true,
      image: {
        uri:
          "https://avatars2.githubusercontent.com/u/3902527?s=200&u=a0d16b13ed719f35d95ca0f4440f5d07c32c349a&v=4",
      },
    })
    // make an API call for the demo
    // Don't do API like this, use store's API
    const demo = new Api()
    demo.setup()
    demo.getUser("1")
    // Let's do some async storage stuff
    await save("Cool Name", "Boaty McBoatface")
  }

  render() {
    let { cartStore } = this.props.rootStore;
    let { vendorName, vendorMenu } = this.state;
    return (
      <View style={FULL}>
        <Wallpaper />
        <SafeAreaView style={FULL}>
          <Screen style={CONTAINER} backgroundColor={color.transparent} preset="scrollStack">
            <Header
              headerTx="secondExampleScreen.howTo"
              leftIcon="back"
              onLeftPress={this.goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />

            <SectionList
              renderItem={({ item, index, section }) => <MenuItem menuItem = { item } cartStore = { cartStore }></MenuItem>}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={TITLE}>{title}</Text>
              )}
              sections={[
                { title: vendorName + '\'s Menu', data: vendorMenu },
                // { title: 'Title2', data: ['item3', 'item4'] },
                // { title: 'Title3', data: ['item5', 'item6'] },
              ]}
              keyExtractor={(item, index) => item + index}
            />

            <TouchableHighlight onPress = {() => console.log(this.props.rootStore.cartStore)}>
              <Text>Get Cart Store</Text>
            </TouchableHighlight>

          </Screen>
        </SafeAreaView>
      </View>
    )
  }
}
