import React from 'react'
import {View, Alert} from 'react-native'
import PrimaryButton from '../../components/primary-button.js'
import * as css from '../style';
import {NavigationScreenProps} from 'react-navigation'
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../stores/root-store';
import { Input } from 'react-native-elements';

export interface CreateAccountScreenProps extends NavigationScreenProps<{}> {
        rootStore?: RootStore
    }

@inject("rootStore")
@observer
export class CreateAccountScreen extends React.Component<CreateAccountScreenProps, { firstName: String, lastName: String, phoneNumber: String }> {

        constructor(props) {
                super(props);
                this.state = {
                        firstName: "",
                        lastName: "",
                        phoneNumber: "",
                }
        }
        
        continueHandler() {
                if (this.state.firstName != "" && this.state.lastName != "" && this.state.phoneNumber != "") {
                        
                } else {
                        // If states have not been changed, alert user
                        Alert.alert("Invalid Inputs", "Please enter valid information in each field");
                }
        }

        render() {
                return (
                        <View style={css.screen.defaultScreen}>
                                {/* <FormLabel>netID</FormLabel>
                                <FormInput ref={input => { this.input = input }} />
                                <FormValidationMessage>Error</FormValidationMessage> */}
                               
                                {/* <FormLabel>First Name</FormLabel>
                                <FormInput onChangeText={this.createAccount.bind(this)}/>
                                <FormValidationMessage>Error message</FormValidationMessage>

                                <FormLabel>Last Name</FormLabel>
                                <FormInput onChangeText={this.createAccount.bind(this)}/>
                                <FormValidationMessage>Error message</FormValidationMessage> */}
                                <View margin={20} >
                                        <Input placeholder="netID" editable={false}>
                                                {this.props.rootStore.userStore.user.netID}
                                        </Input>
                                        <Input placeholder="First Name" onChangeText={(text) => this.setState({firstName: text})}>
                                        </Input>
                                        <Input placeholder="Last Name" onChangeText={(text) => this.setState({lastName: text})}>
                                        </Input>
                                        <Input placeholder="Phone Number" autoComplete={'tel'} keyboardType={'phone-pad'} onChangeText={(text) => this.setState({phoneNumber: text})}>
                                        </Input>
                                </View>
                                <PrimaryButton
                                        title= "Continue"
                                        onPress={this.continueHandler.bind(this)}
                                />
                        </View>
                )
        }
}