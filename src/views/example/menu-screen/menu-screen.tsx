import * as React from "react"
import { View, ViewStyle, TextStyle, SafeAreaView, SectionList, TouchableHighlight } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Text } from "../../shared/text"
import { Wallpaper } from "../../shared/wallpaper"
import { Header } from "../../shared/header"
import { color, spacing } from "../../../theme"
import { inject, observer } from "mobx-react"
import { RootStore } from "../../../app/root-store"
import { MenuItem } from "./menu-item"
// import { CartStore } from "../../../app/stores/cart-store";
import { VendorStore } from "../../../app/stores/vendorStore";

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const BOLD: TextStyle = { fontWeight: "bold" }
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
  // Loading in first vendor from vendorStore
  constructor(props) {
    super(props);
    let vendorName, vendorMenu;
    let { vendor: vendorArray } : VendorStore = this.props.rootStore.vendorStore;
    if (vendorArray.length > 0) {
      let vendor = vendorArray[0];
      vendorName = vendor.name;
      vendorMenu = vendor.menu;
    } else {
      vendorName = "";
      vendorMenu = []; 
    }
    this.state = { vendorName: vendorName, vendorMenu: vendorMenu };
  }

  goBack = () => this.props.navigation.goBack(null)

  render() {
    let { cartStore } : RootStore = this.props.rootStore;
    let { vendorName, vendorMenu } = this.state;
    console.log(vendorMenu);
    return (
      <View style={FULL}>
        <Wallpaper />
        <SafeAreaView style={FULL}>
          <Screen style={CONTAINER} backgroundColor={color.transparent} preset="scrollStack">
            <Header
              headerText="Vendor"
              leftIcon="back"
              onLeftPress={this.goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />

            {/* Section List to render in each item on menu */}
            <SectionList
              // Passing in the entire cart store into each menuItem
              renderItem={({ item, index, section }) => <MenuItem menuItem = { item } cartStore = { cartStore }></MenuItem>}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={TITLE}>{title}</Text>
              )}
              sections={[
                { title: vendorName + "\'s Menu", data: vendorMenu },
              ]}
              keyExtractor={(item, index) => item + index}
            />

              {/* Access cart store just to debug */}
            {/* <TouchableHighlight onPress = {() => console.log(this.props.rootStore.cartStore)}>
              <Text>Checkout Cart Store</Text>
            </TouchableHighlight> */}

          </Screen>
        </SafeAreaView>
      </View>
    )
  }
}
