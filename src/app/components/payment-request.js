import React from "react";
import { View } from "react-native";
import stripe from "tipsi-stripe";

export default class PaymentRequest extends React.Component {
        constructor(props) {
                super(props);
                stripe.setOptions({
                        publishableKey: 'pk_test_AFqSBwnwrS3AInWfxCylFcyk'
                });
        }

        async pullUpForm() {
                const {onCreditInput} = this.props;
                const token = await stripe.paymentRequestWithCardForm(); // Modal doesn't close by itself?
                console.log(token);
                onCreditInput(token);
        }

        render() {
                this.pullUpForm();
                return (
                        <View />
                )
        }
}