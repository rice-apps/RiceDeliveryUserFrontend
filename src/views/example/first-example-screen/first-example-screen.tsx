import * as React from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView, StatusBar } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../shared/text"
import { Button } from "../../shared/button"
import { Screen } from "../../shared/screen"
import { Wallpaper } from "../../shared/wallpaper"
import { Header } from "../../shared/header"
import { color, spacing } from "../../../theme"

import { BatchComponent } from "../../../app/component/batch-component"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = { 
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = { 
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = { 
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = { 
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = { 
  ...TEXT, 
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  paddingBottom: 20,
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,  
  color: "#BAB6C8",  
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = { 
  paddingVertical: spacing[4], 
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4], 
  paddingHorizontal: spacing[4], 
}

const apple = {
  itemName: "Apple",
  quantity: 4,
}
const orange = {
  itemName: "Apple",
  quantity: 4,
}
const bananas = {
  itemName: "Apple",
  quantity: 4,
}

const johnnyOrder = {
  name: "Johnny",
  college: "Jones",
  phoneNumber: "hit me up",
  orderTime: 142,
  items: [apple, orange, bananas],
}
const amyOrder = {
  name: "Amy",
  college: "Idk",
  phoneNumber: "hehe",
  orderTime: 233,
  items: [apple, orange, bananas],
}

const batch = {
  orders: [johnnyOrder, amyOrder],
}

export interface FirstExampleScreenProps extends NavigationScreenProps<{}> {}

export class FirstExampleScreen extends React.Component<FirstExampleScreenProps, {}> {
  nextScreen = () => this.props.navigation.navigate("secondExample")

  render() {
    return (
      <View style={FULL}>
        <StatusBar barStyle="light-content" />      
        <Wallpaper />
        <SafeAreaView style={FULL}>

          <Screen style={CONTAINER} backgroundColor={color.transparent} preset="scrollStack">
            <Header
              headerTx="firstExampleScreen.poweredBy"
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />
            <Text style={TITLE_WRAPPER}> 
              <Text style={TITLE} text="Current Batches" />
            </Text>

            <Text style={CONTENT}>
            This is fun
            </Text>

            <BatchComponent orders={[johnnyOrder, amyOrder]} ></BatchComponent>

          </Screen>
          
        </SafeAreaView>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Button
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="firstExampleScreen.continue"
              onPress={this.nextScreen}
              />
          </View>
        </SafeAreaView>
      </View>
    )
  }
}
