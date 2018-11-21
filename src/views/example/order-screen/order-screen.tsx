import * as React from "react"
import { View, ViewStyle, TextStyle, SafeAreaView, SectionList } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Text } from "../../shared/text"
import { Wallpaper } from "../../shared/wallpaper"
import { Header } from "../../shared/header"
import { color, spacing } from "../../../theme"
import { inject, observer } from "mobx-react"
import { RootStore } from "../../../app/root-store";
import { Order } from "../../../app/stores/order-store";
import { SingleOrder } from "./single-order"
import { User } from "../../../app/stores/user-store";

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

export interface OrderScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

/**
 * inject finds root store in mobx state tree
 * observer lets us read things from the store
 */
@inject("rootStore")
@observer
export class OrderScreen extends React.Component<OrderScreenProps, {orders: Array<Order>, user: User}> {
  constructor(props) {
    super(props)
    let user;
    let { orders: orderArray } = this.props.rootStore.orderStore;
    let { users: userArray } = this.props.rootStore.userStore; 
    if (userArray.length > 0) {
      user = userArray[0];
    } else {
      user = {};
    }
    this.state = {orders: orderArray, user: user} 
    // The current hard-coded user has netid = "Lyla.Nicolas"
    this.props.rootStore.orderStore.startOrderPolling(user.netid);
    // this.props.rootStore.orderStore.startOrderPolling("Lowe_Deangelo");
  }

  goBack = () => this.props.navigation.goBack(null)

  render() {
    let { firstName, lastName } = this.state.user;
    let { orders } = this.state;
    let { vendorStore } = this.props.rootStore;
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
                renderItem={({item, index}) => {return <SingleOrder order= {item} vendorStore= {vendorStore}></SingleOrder>}}
                renderSectionHeader={({section: {title}}) => <Text style={TITLE}>{title}</Text>}
                sections={[
                  {title: firstName + ' ' +  lastName + '\'s Orders:', data: orders.map((x, index) => x)},
                ]}
                keyExtractor={(item, index) => item + index}
              />

          </Screen>
        </SafeAreaView>
      </View>
    )
  }
}
