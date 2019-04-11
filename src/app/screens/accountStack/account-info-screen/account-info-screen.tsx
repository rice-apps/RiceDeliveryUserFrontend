import * as React from 'react'
import { AsyncStorage, Text, ScrollView, View, StyleSheet, FlatList, TouchableHighlight, TextInput, Alert} from "react-native"
import * as css from '../../style';
import PrimaryButton from '../../../components/primary-button';
import { client } from '../../../main'
import gql from 'graphql-tag'
import { Divider } from 'react-native-elements';
import { RootStore } from '../../../stores/root-store';
import { inject, observer } from 'mobx-react';
import { NavigationScreenProps } from 'react-navigation'
import Icon from "react-native-vector-icons/MaterialIcons"
import { toJS } from 'mobx';

export interface AccountInfoScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

interface AccountInfoScreenState {
  firstName: String
  lastName: String
  phone: String
  netID: String
  loadingButton: boolean
}

@inject("rootStore")
@observer
export class AccountInfoScreen extends React.Component<AccountInfoScreenProps, AccountInfoScreenState > {
	constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      netID: "",
      loadingButton: false
    }
  }

  componentWillMount() {
    // When the component mounts, fetch existing user info from backend using netID
    this.fetchUser();
  }
  
  async fetchUser() {
    // Find the user and set the appropriate states
    let user = await this.props.rootStore.userStore.getUser(this.props.rootStore.userStore.user.netID)
    console.log("fetched user")
    console.log(toJS(user))
    await this.setState({netID: user.netID, firstName: user.firstName, lastName: user.lastName, phone: user.phone})
  }

	async updateAccount() {
    await this.setState({loadingButton: true})
    let infoToUpdate = {
      netID: this.state.netID,
      firstName: this.state.firstName,
      lastName: this.state.lastName, 
      phone: this.state.phone
    };

    let user = await this.props.rootStore.userStore.updateUser(infoToUpdate)
    this.setState({firstName: user.firstName, lastName: user.lastName, phone: user.phone, loadingButton: false})
  }
 
  render() {
    return (
      <View style={css.screen.paddedScreen}>
        <View style={css.screen.accountInfoContainer}>
          <View style={{
            flex : 0.3,
            flexDirection : "column",
            justifyContent : "space-evenly",
            alignItems: "flex-start",
          }}>

            <Text style={{fontSize:10, color:css.LIGHTEST_GRAY}}>
              First Name
            </Text>
            <TextInput style={{fontSize:20, alignSelf: 'stretch'}} onChangeText={(name) => this.setState({firstName: name})}>
              {this.props.rootStore.userStore.user.firstName}
            </TextInput>
            <Divider style={css.screen.divider} />            
            
            <Text style={{fontSize:10, color:css.LIGHTEST_GRAY}}>
              Last Name
            </Text>
            <TextInput style={{fontSize:20, alignSelf: 'stretch'}} onChangeText={(name) => this.setState({lastName: name})}>
              {this.props.rootStore.userStore.user.lastName}
            </TextInput>
            <Divider style={css.screen.divider} />
            
            <Text style={{fontSize:10, color:css.LIGHTEST_GRAY}}>
              Phone Number
            </Text>
            <TextInput style={{fontSize:20, alignSelf: 'stretch'}} onChangeText={(phone) => this.setState({phone: phone})}>
              {this.props.rootStore.userStore.user.phone}
            </TextInput>
            <Divider style={css.screen.divider} />

          </View>
        </View>
        <PrimaryButton 
            title={"Update Account"}
            loading={this.state.loadingButton}
            disabled={this.state.loadingButton}
            onPress={() => this.updateAccount().then(res => {
              Alert.alert("Account information updated.")
              this.props.navigation.pop();
            })}>
        </PrimaryButton>
      </View>
    )
  }
}
