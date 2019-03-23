import * as React from 'react'
import { Text, View, TextInput, AsyncStorage} from 'react-native';
import * as css from '../../style';
import PrimaryButton from '../../../components/primary-button';
import { client } from '../../../main'
import gql from 'graphql-tag'
import { Divider } from 'react-native-elements';
import { RootStore } from '../../../stores/root-store';
import { inject, observer } from 'mobx-react';
import { NavigationScreenProps } from 'react-navigation'


export interface AccountInfoScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

@inject("rootStore")
@observer
export class AccountInfoScreen extends React.Component<AccountInfoScreenProps, {firstName: String, lastName: String, phoneNumber: String, netID: String}> {
	constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      netID: "",
    }
  }

  async componentWillMount() {
    // When the component mounts, fetch existing user info from backend using netID
    const netID = await AsyncStorage.getItem("Authenticated");
    this.setState({netID: netID});
    console.log(netID);
    console.log(this.state.netID);
    await this.fetchUser();
  }
  
  async fetchUser() {
    // Find the user and set the appropriate states
    const userInfo = await client.query({
      query: gql`
      query user($data: String!) {
        user(netID: $data) {
          netID
          firstName
          lastName
          phone
        }
      }
      `
      ,
      variables: {
        data: this.state.netID
      }
    });
    console.log(userInfo);
    const user = userInfo.data.user[0];
    console.log(user);
    // await this.props.rootStore.userStore.setUser(user);
    console.log(this.props.rootStore.userStore.user);
    this.setState({firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phone})
  }

	async updateAccount() {
    const updatedUserInfo = await client.mutate({
      mutation: gql`
      mutation mutate($data: UpdateUserInput!) {
        updateUser(data: $data) {
          netID
          firstName
          lastName
          phone
        }
      }
      `
      , 
      variables : {
        data: {
          netID: this.state.netID,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phone: this.state.phoneNumber
      }
    }
    });
    console.log(updatedUserInfo);
    const user = updatedUserInfo.data.updateUser;
    this.setState({firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phone})
    console.log(this.state.lastName);
    await this.props.rootStore.userStore.setUser(user);
    console.log(this.props.rootStore.userStore.user);
  }
 
  render() {
    return (
      <View style={css.screen.paddedScreen}>
        <View style={css.screen.accountScreenContainer}>
          <View style={{
            flex : 0.3,
            flexDirection : "column",
            justifyContent : "space-evenly",
            alignItems: "flex-start"
          }}>

            <Text style={{fontSize:10, color:css.LIGHTEST_GRAY}}>
              First Name
            </Text>
            <TextInput style={{fontSize:20}} onChangeText={(name) => this.setState({firstName: name})}>
              {this.props.rootStore.userStore.user.firstName}
            </TextInput>
            <Divider style={css.screen.divider} />            
            
            <Text style={{fontSize:10, color:css.LIGHTEST_GRAY}}>
              Last Name
            </Text>
            <TextInput style={{fontSize:20}} onChangeText={(name) => this.setState({lastName: name})}>
              {this.props.rootStore.userStore.user.lastName}
            </TextInput>
            <Divider style={css.screen.divider} />
            
            <Text style={{fontSize:10, color:css.LIGHTEST_GRAY}}>
              Phone Number
            </Text>
            <TextInput style={{fontSize:20}} onChangeText={(phone) => this.setState({phoneNumber: phone})}>
              {this.state.phoneNumber}
            </TextInput>
            <Divider style={css.screen.divider} />

          </View>
        </View>
        <PrimaryButton 
            title={"Update Account"}
            onPress={() => this.updateAccount().then(res => {
              this.props.navigation.pop();
            })}>
        </PrimaryButton>
      </View>
    )
  }
}
