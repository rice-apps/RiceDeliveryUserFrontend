import React from "react";
import { View } from "react-native";
import stripe from "tipsi-stripe";

export default class PaymentRequest extends React.Component {
        constructor(props) {
                super(props);
                stripe.setOptions({
                        publishableKey: 'pk_test_v5O7UYeViJ9FzgoiQujGKxEG'
                });
                this.state = {
                        isFirstTime: true,
                }  
        }

        async pullUpForm() {
                const {onCreditInput} = this.props;
                const token = stripe.paymentRequestWithCardForm().then((token) => {
                        this.setState({isFirstTime: false})
                        onCreditInput(token);
                }).catch(e => {
                        console.log("error token")
                        console.log(token);
                        onCreditInput(null);
                })
        }

        render() {
                if (this.state.isFirstTime) {
                        this.pullUpForm();
                }
                return (
                        <View />
                )
        }
}