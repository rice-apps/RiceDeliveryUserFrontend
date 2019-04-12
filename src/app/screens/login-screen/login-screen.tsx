import React from 'react'
import {View, Alert, AsyncStorage, Text} from 'react-native'
import PrimaryButton from '../../components/primary-button.js'
import * as css from '../style';
import AuthModal from '../../components/auth-modal'
import {NavigationScreenProps} from 'react-navigation'
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../stores/root-store';
import { toJS } from 'mobx';
import { material } from 'react-native-typography';
 

console.disableYellowBox = true;
// import * as css from "../../style"

export interface LoginScreenProps extends NavigationScreenProps<{}> {
    rootStore?: RootStore
}

@inject("rootStore")
@observer
export class LoginScreen extends React.Component<LoginScreenProps, {displayError: boolean, modalVisible: boolean, rootStore: RootStore }> {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            rootStore: this.props.rootStore,
            displayError: false
        }
    }

    navigateToMenu() {
        this.props.navigation.navigate("Menu");
    }
    
    async onSuccess() {
        // Cache data for persistence
        await AsyncStorage.setItem('Authenticated', this.state.rootStore.userStore.user.netID);
        console.log("onSuccess")
        console.log(toJS(this.state.rootStore.userStore))
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

    async onFailure() {
        await this.setState({modalVisible:false, displayError: true})
        // await this.props.navigation.replace("Login")    
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    async loginHandler() {
        await this.setState({displayError: false})

        const authenticated = await AsyncStorage.getItem("Authenticated");
        // console.log("\n\n\n\n")
        // console.log("Login handler!");
        // console.log("Does this user have an account? " + this.state.rootStore.userStore.hasAccount);
        // console.log("Is this user authenticated? "+authenticated);
        // console.log("\n\n\n\n")
        if (!authenticated) {

            this.setModalVisible(!this.state.modalVisible);
        } else { 
            // Get user from authenticated netid
            let user = await this.state.rootStore.userStore.getUserFromNetID(authenticated);
            // if the user doesn't exist. i.e. they quit the app before creating a user.  
            if (user === -1) {
                console.log("user cancelled when creating")
                this.props.rootStore.userStore.resetUser()
                AsyncStorage.removeItem("Authenticated")
                this.setModalVisible(!this.state.modalVisible);
                return;
            }
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
            <View style={css.screen.defaultScreen}>
                <View style={{flex : 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <PrimaryButton
                        title ="Sign In"
                        onPress={this.loginHandler.bind(this)}
                    />
                    {this.state.displayError && <Text style={[material.caption, {color: "red"}]}>Login failed. Please try again.</Text>}
                </View>
                <AuthModal visible={this.state.modalVisible} setVisible={this.setModalVisible.bind(this)} onSuccess={this.onSuccess.bind(this)} onFailure={this.onFailure.bind(this)}>
                </AuthModal>

            </View>
        )
    }
}

export default LoginScreen