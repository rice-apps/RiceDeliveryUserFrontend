import React from 'react'
import {View, Text, Button, TextInput, Image, TouchableHighlight} from 'react-native'
// import PrimaryButton from '../../../components/primary-button.js'
// import SecondaryButton from '../../../components/secondary-button.js'

console.disableYellowBox = true;
// import * as css from "../../style"

class LoginScreen extends React.Component {

    loginHandler = () => {
        this.props.navigation.navigate("Tabs")
    }

    render() {
        return (
            // <View style={css.screen.defaultScreen}>
            <View style={{
                marginTop : 50,
                marginLeft : 50,
                }}>
                <TouchableHighlight onPress={this.loginHandler}>
                    <Text>LOGIN</Text>
                </TouchableHighlight>
                {/* <Text style={css.text.logo}>
                    hedwig.
                    <Image source={require('../../../img/hedwig.png')} style={css.image.logo} />
                </Text> 

                <Text style={css.text.regularText}>
                    Email
                </Text>

                <TextInput 
                    style = {css.text.textInput}
                    placeholder = "Enter email"
                />

                <Text style={css.text.regularText}>
                    Password
                </Text>
                
                <TextInput 
                    style = {css.text.textInput}
                    placeholder="Enter password"
                />         */}
    
                {/* <PrimaryButton
                    title ="Sign In"
                    onPress={this.loginHandler}
                />

                <SecondaryButton
                    title ="Create Account"
                /> */}

            </View>
        )
    }
}

export default LoginScreen