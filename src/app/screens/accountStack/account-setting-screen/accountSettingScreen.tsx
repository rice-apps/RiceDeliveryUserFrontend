import * as React from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList} from 'react-native';
// import { ListItem } from 'react-native-elements'
// import SecondaryButton from '../../../../components/secondary-button.js'
// import * as css from "../../../style";


export class AccountScreen extends React.Component<any, any> {

  list = [
    {
      name: 'Vendor Name',
      subtitle: 'Change vendor information',
      navigateTo: 'VendorInfo'
    },
    {
      name: 'Hours of Operation',
      subtitle: 'Change hours of operation',
      navigateTo: 'HoursOperation'
    },
    {
      name: 'Menu',
      subtitle: 'Change the menu for the night',
      navigateTo: 'Menu'
    },
    {
      name: 'Transaction History',
      subtitle: 'View all past orders',
      navigateTo: "TransactionHist"
    },
  ];

//   keyExtractor = (item, index) => index

//   renderItem = ({ item }) => (
//     <ListItem
//       titleStyle={css.text.bodyText}
//       title={item.name}
//       subtitle={item.subtitle}
//       onPress={() =>  this.props.navigation.navigate(item.navigateTo)}
//     />
//   )

  render() {

    return (
        // <View style = {css.screen.paddedScreen}>
      <View>

          <Text>THIS IS ACCOUNT</Text>

     
        {/* <ScrollView>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.list}
            renderItem={this.renderItem}
          />
        </ScrollView> */}


        {/* <View>
          <SecondaryButton
            title ="Logout"
          />
        </View> */}

      </View>
    )
  }
}

