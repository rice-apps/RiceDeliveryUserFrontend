import * as React from 'react'
import { Text, View, Alert} from "react-native"
import { NavigationScreenProps } from 'react-navigation'
import * as css from '../../style';
import PrimaryButton from '../../../components/primary-button';
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../../stores/root-store';
import stripe from "tipsi-stripe";
import { AsyncStorage } from 'react-native'
import PaymentRequest from '../../../components/payment-request.js'
import { client } from '../../../main'
import gql from 'graphql-tag'
import { material } from 'react-native-typography';

export interface PaymentInfoScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

@inject("rootStore")
@observer
export class PaymentInfoScreen extends React.Component<PaymentInfoScreenProps, {displayError: boolean, netID: String, token: String, addCardPressed : Boolean}> {
    constructor(props) {
        super(props);
        this.state = {
          netID: "",
          token: null,
          addCardPressed: false,
          displayError: false
        }
        console.log("Stripe Object " + stripe);
          stripe.setOptions({
                  publishableKey: 'pk_test_v5O7UYeViJ9FzgoiQujGKxEG'
          });
    }

    async componentWillMount() {
      // When the component mounts, fetch existing user info from backend using netID
      const netID = await AsyncStorage.getItem("Authenticated");
      this.setState({netID: netID});
      console.log(netID);
      console.log(this.state.netID);
}

      onCreditInput(object: any) {
            this.setState({token : object});
            //TODO: Check if token is valid or no?
            if (this.state.token.tokenId != null) {
                    this.updateAccount(object.card.last4);
                    // save the last 4 digits for the payment submission form.
            }
            this.props.navigation.pop();

      }

      displayError() {
        this.setState({displayError: true})
      }
      async updateAccount(creditLast4) {
            const updatedUserInfo = await client.mutate({
              mutation: gql`
              mutation mutate($data: UpdateUserInput!, $last4: String) {
                updateUser(data: $data, last4: $last4) {
                  netID
                  firstName
                  lastName
                  last4
                  phone
                  creditToken
                }
              }
              `
              , 
              variables : {
                data: {
                  netID: this.state.netID,
                  creditToken: this.state.token.tokenId,
                },
                last4: creditLast4
            }
            });
            if (updatedUserInfo.data.updateUser.firstName === null) {
              Alert.alert('Something went wrong with updating your card. Please try again.');
              return;
            }
            this.props.rootStore.userStore.saveCreditInfo(creditLast4);
            console.log(this.props.rootStore.userStore.user.last4)
            console.log(updatedUserInfo);
            const user = updatedUserInfo.data.updateUser;
            console.log(user);
            Alert.alert('Updated Payment Info', 'Successfully Updated');
      }

	render() {
    if (this.state.addCardPressed) {
      this.setState({addCardPressed: !this.state.addCardPressed})
      return (<PaymentRequest
          onCreditInput={this.onCreditInput.bind(this)}
      />);
    } else {
      return (
        <View style={css.screen.paddedScreen}>
        <View style={css.screen.accountScreenContainer}> 
          <Text style={[material.headline, {textAlign: "center"}]}>Replace your form of payment by adding a new card</Text>
          {/* TODO - need to display this with current credit card information  */}
        </View>
        <PrimaryButton
          title ="Add a New Card"
          onPress={() => this.setState({addCardPressed: true})}
        />
         {
          this.state.displayError && 
            <Text style={[material.caption, {color: "red"}]}>Something went wrong with updating your credit card. Please try again.</Text>
          }
        </View>
       
      )
    }
  }
}
