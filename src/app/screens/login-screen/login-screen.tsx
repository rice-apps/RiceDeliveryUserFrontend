import React from 'react'
import {View, Alert, AsyncStorage} from 'react-native'
import PrimaryButton from '../../components/primary-button.js'
import SecondaryButton from '../../components/secondary-button.js'
import * as css from '../style';
import AuthModal from '../../components/auth-modal'
import {NavigationScreenProps} from 'react-navigation'
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../root-store.js';
 

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
        this.setState({modalVisible: false}, () => this.props.navigation.navigate("Menu"));
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

    loginHandler = async () => {
        // this.props.navigation.navigate("Tabs")
        const authenticated = await AsyncStorage.getItem("Authenticated");
        if (authenticated == null) {
            this.setModalVisible(!this.state.modalVisible);
        } else {
            this.props.navigation.navigate("Menu");
        }
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
    
                <PrimaryButton
                    title ="Sign In"
                    onPress={this.loginHandler}
                />

                <SecondaryButton
                    title ="Create Account"
                />

                <AuthModal visible={this.state.modalVisible} setVisible={this.setModalVisible.bind(this)} onSuccess={this.onSuccess.bind(this)} onFailure={this.onFailure.bind(this)}>
                </AuthModal>

            </View>
        )
    }
}

export default LoginScreen