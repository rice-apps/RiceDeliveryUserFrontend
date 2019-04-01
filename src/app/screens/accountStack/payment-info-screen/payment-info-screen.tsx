import * as React from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList} from "react-native"
import { NavigationScreenProps} from 'react-navigation'
import * as css from '../../style';
import { Divider } from 'react-native-elements';
import PrimaryButton from '../../../components/primary-button';

export interface PaymentInfoScreenProps extends NavigationScreenProps<{}> {
}

export class PaymentInfoScreen extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

	render() {

    return (
      <View style={css.screen.paddedScreen}>
      <View style={css.screen.accountScreenContainer}> 

          <Text style={css.text.accountHeaderText}>Current Payment Methods</Text>

          <Divider style={css.screen.divider} />

          <Text style={css.text.bigBodyTextCentered}>
          Bank ** 2523 
          {/* TODO - need to display this with current credit card information  */}
          </Text>

          <Divider style={css.screen.divider} />
      </View>
      <PrimaryButton
                  title ="Add a New Card"
                  onPress={() => this.props.navigation.navigate("AddPayment")}
              />
      </View>
    )
  }
}
