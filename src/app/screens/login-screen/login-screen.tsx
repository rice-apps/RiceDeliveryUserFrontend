import React from 'react'
import {View, Alert, AsyncStorage, Image, Text} from 'react-native'
import PrimaryButton from '../../components/primary-button.js'
import * as css from '../style';
import AuthModal from '../../components/auth-modal'
import {NavigationScreenProps} from 'react-navigation'
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../stores/root-store';
import { toJS } from 'mobx';
 

console.disableYellowBox = true;
// import * as css from "../../style"

export interface LoginScreenProps extends NavigationScreenProps<{}> {
    rootStore?: RootStore
}

@inject("rootStore")
@observer
export class LoginScreen extends React.Component<LoginScreenProps, { modalVisible: boolean, rootStore: RootStore }> {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            rootStore: this.props.rootStore
        }
    }

    navigateToMenu() {
        this.props.navigation.navigate("Menu");
    }
    
    async onSuccess() {
        // Cache data for persistence
        await AsyncStorage.setItem('Authenticated', this.state.rootStore.userStore.user.netID);
        if (!this.state.rootStore.userStore.hasAccount) { // user account does not exist
            // Navigate to screen for account information
            console.log("Has Account " + this.state.rootStore.userStore.hasAccount);
            this.props.navigation.replace("CreateAccount");
        } else { // user account exists
            console.log("CHECKING ON SUCCESS")
            console.log(toJS(this.props.rootStore.userStore.user))
            this.setState({modalVisible: false}, () => this.props.navigation.navigate("Menu"));
        }
    }

    onFailure() {
        this.setState({modalVisible:false}, () => {
            (() => {this.props.navigation.replace("Login")})();
        }
        );
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    async loginHandler() {
        const authenticated = await AsyncStorage.getItem("Authenticated");
        console.log("\n\n\n\n")
        console.log("Login handler!");
        console.log("Does this user have an account? " + this.state.rootStore.userStore.hasAccount);
        console.log("Is this user authenticated? "+authenticated);
        console.log("\n\n\n\n")
        
        if (!authenticated) {

            this.setModalVisible(!this.state.modalVisible);
        } else { 
            // Get user from authenticated netid
            await this.state.rootStore.userStore.getUserFromNetID(authenticated);
            console.log("login")
            this.props.navigation.navigate("Menu");
        }
    }   

    createHandler = async() => {
        this.props.navigation.navigate("Tabs")
    }

    render() {
        console.log("Console!");
        return (
        <View style={[css.screen.defaultScreen, {backgroundColor: "light-gray"}]}>
            <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ width: "50%", height: 300 }} />
            <Text style={[css.text.logo, {color:"gray"}]}>
            hedwig.
            <Image source={require("../../../img/hedwig.png")} style={css.image.logo} />
            </Text>
            <PrimaryButton title="Sign In" onPress={this.loginHandler.bind(this)} />
            </View>
            <AuthModal
            visible={this.state.modalVisible}
            setVisible={this.setModalVisible.bind(this)}
            onSuccess={this.onSuccess.bind(this)}
            onFailure={this.onFailure.bind(this)}
            />
      </View>
        )
    }
}

export default LoginScreen