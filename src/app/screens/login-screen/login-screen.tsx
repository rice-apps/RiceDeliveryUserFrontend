import React from 'react'
import {View, Text, Button, TextInput, Image, TouchableHighlight, WebView} from 'react-native'
import { NavigationScreenProps } from "react-navigation"
import { inject, observer } from "mobx-react"
import { RootStore } from '../../root-store';
import { UserStore } from '../../stores/user-store';
// import PrimaryButton from '../../../components/primary-button.js'
// import SecondaryButton from '../../../components/secondary-button.js'

console.disableYellowBox = true;
// import * as css from "../../style"
export interface LoginScreenProps extends NavigationScreenProps<{}> {
    rootStore?: RootStore
}

@inject("rootStore")
@observer
class LoginScreen extends React.Component<LoginScreenProps, { userStore: UserStore }> {

    constructor(props) {
        super(props);
        this.state = {
            userStore: props.rootStore.userStore,
        }
    }

    loginHandler = () => {
        this.props.navigation.navigate("Tabs")
    }

    async _onNavigationStateChange(webViewState) {
        console.log(webViewState.url);
    
        var equalSignIndex = webViewState.url.indexOf('ticket=') + 1;
        if (equalSignIndex > 0) {

            var ticket = webViewState.url.substring(equalSignIndex + 6);
            console.log("Parsed Ticket: " + ticket);
            // this.state.userStore.authenticate(ticket);
            let badTicket = "28939299239";
            await this.state.userStore.authenticate(badTicket);
            console.log("Authenticated");
            let authenticated = this.state.userStore.authenticated;
            console.log("Post Auth");
            console.log(authenticated);
            this.props.navigation.navigate("Menu");
        }
    
    
    }

    render() {
        console.log(this.state.userStore.user);
        return (
            // <View style={css.screen.defaultScreen}>
            <View style={{
                flex: 1
                }}>
                {this.state.userStore.user.netID != "" ?
                    this.props.navigation.navigate("Menu") :
                    (
                        <WebView
                            // source={{uri: 'https://idp.rice.edu/idp/profile/cas/login?service=hedwig://localhost:8080/auth'}}
                            source={{ uri: 'https://idp.rice.edu/idp/profile/cas/login?service=https://riceapps.org' }}
                            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                            style={{ marginTop: 20 }}
                        />
                    )
                }
                {/* <TouchableHighlight onPress={this.loginHandler}>
                    <Text>LOGIN</Text>
                </TouchableHighlight> */}
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