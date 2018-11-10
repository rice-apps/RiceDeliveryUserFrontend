import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, SectionList } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Text } from "../../shared/text"
import { Button } from "../../shared/button"
import { Wallpaper } from "../../shared/wallpaper"
import { Header } from "../../shared/header"
import { color, spacing } from "../../../theme"
import { BulletItem } from "../bullet-item"
import { Api } from "../../../services/api"
import { save } from "../../../lib/storage"
import { inject, observer } from "mobx-react"
import { RootStore } from "../../../app/root-store";
import { OrderStoreModel } from "../../../app/stores/order-store";
import { getRoot } from "mobx-state-tree";

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

export interface OrderScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

/**
 * inject finds root store in mobx state tree
 * observer lets us read things from the store
 */
@inject("rootStore")
@observer 
export class OrderScreen extends React.Component<OrderScreenProps, {orders: Array<any>, user: any}> {
  constructor(props) {
    super(props)
    let {orders: orderArray} = this.props.rootStore.orderStore;
    let user = this.props.rootStore.userStore.users[0];
    this.state = {orders: orderArray, user: user} 
    // this.userStore = this.props.rootStore.userStore
    // this.orders = this.props.rootStore.orderStore
  }


  goBack = () => this.props.navigation.goBack(null)

  getOrders = async () => {
    let { orderStore } = this.props.rootStore;
    let orders = await orderStore.getOrders(this.state.user.netid);
    this.setState( orders )
    console.log(this.state);

  }

  render() {
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
            {/* <BulletItem text= {this.state.userStore.users[0].netid}/> */}
               
            <SectionList
                renderItem={({item, index}) => <Text key={index}>{item}</Text>}
                renderSectionHeader={({section: {title}}) => (
                  <Text style={{fontWeight: 'bold'}}>{title}</Text>
                )}
                sections={

                  
                  [
                  {title: "Title1" , data: [this.state.user.firstName]},
                  // {title: 'Title2', data: [this.state.orderStore.orders[0]]},
                  {title: 'Title3', data: this.state.orders.map(x => x.user)},
                ]
              
              }
                keyExtractor={(item, index) => item + index}
              />

            <View>
              <Button
                style={DEMO}
                textStyle={DEMO_TEXT}
                tx="secondExampleScreen.reactotron"
                onPress={this.getOrders}
              />
            </View>
          </Screen>
        </SafeAreaView>
      </View>
    )
  }
}
