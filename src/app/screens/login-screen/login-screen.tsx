import React from 'react'
import {View, Text, Button, TextInput, Image, TouchableHighlight} from 'react-native'
import PrimaryButton from '../../components/primary-button.js'
import SecondaryButton from '../../components/secondary-button.js'
import * as css from '../style';

console.disableYellowBox = true;
// import * as css from "../../style"

class LoginScreen extends React.Component {

    loginHandler = () => {
        this.props.navigation.navigate("Tabs")
    }

    render() {
        return (
            <View style={css.screen.defaultScreen}>
            {/* <View> */}
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
                <View style={{flex : 1, flexDirection: "column"}}>

                    <View style={{width: "50%", height: 300}}>

                    </View>
                    <PrimaryButton
                        title ="Sign In"
                        onPress={this.loginHandler}
                    />

                    <SecondaryButton
                        title ="Create Account"
                    />
                </View>
    

            </View>
        )
    }
}

export default LoginScreen