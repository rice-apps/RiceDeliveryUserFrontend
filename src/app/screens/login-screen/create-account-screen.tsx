import React from "react"
import {Alert} from "react-native"
import {NavigationScreenProps} from "react-navigation"
import { inject, observer } from "mobx-react"
import { RootStore } from "../../stores/root-store"
import stripe from "tipsi-stripe"
import Registration from "../../components/registration.js"
import PaymentRequest from "../../components/payment-request.js"
import { client } from "../../main"
import gql from "graphql-tag"

export interface CreateAccountScreenProps extends NavigationScreenProps<{}> {
        rootStore?: RootStore
    }

@inject("rootStore")
@observer
export class CreateAccountScreen extends React.Component<CreateAccountScreenProps, { firstName: String, lastName: String, phoneNumber: String, display: Boolean, token: Object }> {

        constructor(props) {
                super(props)
                this.state = {
                        firstName: "",
                        lastName: "",
                        phoneNumber: "",
                        display: false,
                        token: null,
                }
                console.log("Stripe Object " + stripe)
                stripe.setOptions({
                        publishableKey: "pk_test_v5O7UYeViJ9FzgoiQujGKxEG",
                })
        }

        onTextChanged(text, property) {
                this.setState({ [property]: text })
        } 

        onCreditInput(object) {
                this.setState({token : object})
                //TODO: Check if token is valid or no?
                if (this.state.token.tokenId != null) {
                        this.setState({ display : false})
                        console.log("About to create user");
                        this.createUserHandler()
                        this.props.navigation.navigate("Menu")
                }
        }
        
        continueHandler() {
                if (this.state.firstName != "" && this.state.lastName != "" && this.state.phoneNumber != "") {
                        console.log(stripe)
                        this.setState({ display: true })
                } else {
                        // If states have not been changed, alert user
                        Alert.alert("Invalid Inputs", "Please enter valid information in each field")
                }
        }
        async createUserHandler() {
                console.log("About to create user in createUserHandler")
                const user = await client.mutate({
                        mutation: gql`
                        mutation mutate($data: CreateUserInput!) {
                                createUser(data: $data) {
                                  netID
                                  firstName
                                  lastName
                                  phone
                                  creditToken
                                }
                              }
                        `
                        ,
                        variables: {
                                data: {
                                        netID: this.props.rootStore.userStore.user.netID,
                                        firstName: this.state.firstName,
                                        lastName: this.state.lastName,
                                        phone: this.state.phoneNumber,
                                        // creditToken: "tok_mastercard" // TODO change this because doesn't actually accept token
                                        creditToken: this.state.token.tokenId,
                                },
                        },
                })
                console.log(user);
        }
        render() {
                if (this.state.display) {
                        return (<PaymentRequest
                                onCreditInput={this.onCreditInput.bind(this)}
                                />)
                } else {
                        return (
                                <Registration 
                                        onTextChanged={this.onTextChanged.bind(this)} 
                                        continueHandler={this.continueHandler.bind(this)}
                                        netID={this.props.rootStore.userStore.user.netID}
                                />
                        )
                }
        }
}