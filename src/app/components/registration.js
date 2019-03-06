import React from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements';
import * as css from '../screens/style';
import PrimaryButton from "./primary-button";

 export default class Registration extends React.Component {
        render() {
                const {onTextChanged, continueHandler, netID} = this.props;
                console.log(netID);
                return (
                        <View style={css.screen.defaultScreen}>
                                <View margin={20} >
                                        <Input placeholder="netID" editable={false}>
                                                {netID}
                                        </Input> */}
                                        <Input placeholder="First Name" onChangeText={(text) => onTextChanged(text, "firstName")}>
                                        </Input>
                                        <Input placeholder="Last Name" onChangeText={(text) => onTextChanged(text, "lastName")}>
                                        </Input>
                                        <Input placeholder="Phone Number" autoComplete={'tel'} keyboardType={'phone-pad'} onChangeText={(text) => onTextChanged(text, "phoneNumber")}>
                                        </Input>
                                </View>
                                <PrimaryButton
                                        title="Continue"
                                        onPress={continueHandler}
                                />
                        </View>
                )
        }
} 
