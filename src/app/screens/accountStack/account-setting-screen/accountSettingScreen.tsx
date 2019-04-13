import * as React from "react"
import { ScrollView, View, AsyncStorage, FlatList} from "react-native"
import { ListItem, Text } from "react-native-elements"
import SecondaryButton from "../../../components/secondary-button"
import * as css from "../../style"
import CookieManager from "react-native-cookies" 
import { inject, observer } from "mobx-react"
import { RootStore } from "../../../stores/root-store"
import { NavigationScreenProp } from "react-navigation";

export interface CreateAccountScreenProps {
  rootStore?: RootStore
  navigation: NavigationScreenProp<any, any>
}
@inject("rootStore")
@observer
export class AccountScreen extends React.Component<CreateAccountScreenProps, any> {


  list = [
    {
      name: 'Your Name',
      subtitle: 'Update your account information',
      navigateTo: 'AccountInfo'
    },
    {
      name: 'Payment Cards',
      subtitle: 'Add a credit or debit card',
      navigateTo: 'PaymentInfo'
    },
    {
      name: 'FAQ',
      subtitle: 'Find out more about the app',
      navigateTo: 'FAQ'
    },
  ]

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
    titleStyle={css.text.bodyText}
    title={item.name}
      subtitle={item.subtitle}
      onPress={() =>  this.props.navigation.navigate(item.navigateTo)}
    />
  )

  render() {
    console.log(this.props.rootStore.userStore.user)
    return (
        <View style = {css.screen.paddedScreen}>

        <ScrollView>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.list}
            renderItem={this.renderItem}
          />
        </ScrollView>


        <View>
          <Text>Logged in as:</Text>
          <Text>{this.props.rootStore.userStore.user.netID}@rice.edu</Text>

          <SecondaryButton
            title ="Logout"
            onPress={() => {
              this.props.rootStore.cartStore.removeAllItems()
              this.props.rootStore.userStore.setNotificationAsked(false)
              this.props.rootStore.userStore.setNotificationGranted(false)

              CookieManager.get('https://idp.rice.edu/idp/profile/cas/login?service=https://gizmodo.com/')
                .then((res) => {console.log('CookieManager.get =>', res);});
              CookieManager.clearAll()
                .then((res) => console.log("CookieManager.clearAll =>", res))
              this.props.rootStore.userStore.resetUser()
              AsyncStorage.removeItem("Authenticated")
              this.props.navigation.reset({ index: 0, actions: [this.props.navigation.navigate("Login")]})
            }}
          />
        </View>

      </View>
    )
  }
}

