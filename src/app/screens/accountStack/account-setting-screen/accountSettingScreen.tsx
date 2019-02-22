import * as React from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'
import SecondaryButton from '../../../components/secondary-button';
import * as css from "../../style";
import CookieManager from 'react-native-cookies'; 


export class AccountScreen extends React.Component<any, any> {

  list = [
    {
      name: 'Your Name',
      subtitle: 'Change your account information',
      navigateTo: 'AccountInfo'
    },
    {
      name: 'Default Location',
      subtitle: 'Change default delivery location',
      navigateTo: 'LocationInfo'
    },
    {
      name: 'Payment Cards',
      subtitle: 'Add a credit or debit card',
      navigateTo: 'PaymentInfo'
    },
  ];

  keyExtractor = (item, index) => index

  renderItem = ({ item }) => (
    <ListItem
    titleStyle={css.text.bodyText}
    title={item.name}
      subtitle={item.subtitle}
      onPress={() =>  this.props.navigation.navigate(item.navigateTo)}
    />
  )

  render() {

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
          <SecondaryButton
            title ="Logout"
            onPress={() => CookieManager.clearAll().then((res) => console.log("Cookies cleared"))}
          />
        </View>

      </View>
    )
  }
}

