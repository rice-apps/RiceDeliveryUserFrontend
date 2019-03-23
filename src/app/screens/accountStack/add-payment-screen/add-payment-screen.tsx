import React from 'react'
import { AsyncStorage } from 'react-native'
import { NavigationScreenProps} from 'react-navigation'
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../../stores/root-store';
import stripe from "tipsi-stripe";
import PaymentRequest from '../../../components/payment-request.js'
import { client } from '../../../main'
import gql from 'graphql-tag'

export interface AddPaymentScreenProps extends NavigationScreenProps<{}> {
        rootStore?: RootStore
}

@inject("rootStore")
@observer
export class AddPaymentScreen extends React.Component<AddPaymentScreenProps, { netID: String, token: Object }> {

        constructor(props) {
                super(props);
                this.state = {
                        netID: "",
                        token: null
                }
                console.log("Stripe Object " + stripe);
                stripe.setOptions({
                        publishableKey: 'pk_test_AFqSBwnwrS3AInWfxCylFcyk'
                });
        }

        async componentWillMount() {
                // When the component mounts, fetch existing user info from backend using netID
                const netID = await AsyncStorage.getItem("Authenticated");
                this.setState({netID: netID});
                console.log(netID);
                console.log(this.state.netID);
        }

        onCreditInput(object) {
                this.setState({token : object});
                //TODO: Check if token is valid or no?
                if (this.state.token.tokenId != null) {
                        console.log(this.state.token.tokenId);
                        this.updateAccount();
                        this.props.navigation.pop();
                }
        }

        async updateAccount() {
                const updatedUserInfo = await client.mutate({
                  mutation: gql`
                  mutation mutate($data: UpdateUserInput!) {
                    updateUser(data: $data) {
                      netID
                      firstName
                      lastName
                      phone
                      creditToken
                    }
                  }
                  `
                  , 
                  variables : {
                    data: {
                      netID: this.state.netID,
                      creditToken: this.state.token.tokenId
                  }
                }
                });
                console.log(updatedUserInfo);
                const user = updatedUserInfo.data.updateUser;
                console.log(user);
        }

        render() {
                return (<PaymentRequest
                        onCreditInput={this.onCreditInput.bind(this)}
                        />);
        }
}