import * as React from "react"
import { Text, ScrollView, View, StyleSheet, FlatList} from "react-native"
import * as css from "../../style"
import { Divider } from "react-native-elements"
import PrimaryButton from "../../../components/primary-button.js"


export class PaymentInfoScreen extends React.Component<any, any> {

	addCardPush() {

	}

	render() {

    return (
      <View style={css.screen.defaultScreen}>
      <View style={css.screen.accountScreenContainer}> 

          <Text style={css.text.accountHeaderText}>Payment Methods</Text>

          <Divider style={css.screen.divider} />

          <Text style={css.text.bigBodyText}>
          Bank ** 2523
          </Text>

          <Divider style={css.screen.divider} />

          <Text style={css.text.bigBodyTextCentered}>
              Add a new card
          </Text>

          <View style={css.container.checkoutScreenContainer}>
            <Text style={css.text.itemText}>
                    Name : {"\n"}
                    Email : {"\n"}
                    Phone : 
                </Text>
            </View>

            <View style={css.container.checkoutScreenContainer}>
                <Text>
                    Card Number : 
                </Text>
            </View>

            <PrimaryButton
                  title ="Add"
                  onPress={this.addCardPush}
              />


      </View>
      </View>
    )
  }
}
