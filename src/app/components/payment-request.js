import React from "react";
import { View } from "react-native";
import stripe from "tipsi-stripe";

export default class PaymentRequest extends React.Component {
        constructor(props) {
                super(props);
                stripe.setOptions({
                        publishableKey: 'pk_test_AFqSBwnwrS3AInWfxCylFcyk'
                });
                this.state = {
                        isFirstTime: true,
                }  
        }

        async pullUpForm() {
                const {onCreditInput} = this.props;
                const token = await stripe.paymentRequestWithCardForm();
                this.setState({isFirstTime: false})
                console.log(token);
                onCreditInput(token);
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