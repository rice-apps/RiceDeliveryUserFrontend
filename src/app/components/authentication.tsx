import * as React from "react"
import { View, ViewStyle, StatusBar } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { inject, observer } from "mobx-react"
import { create } from "apisauce"
// Linking
import { WebView } from 'react-native';
import { UserStoreModel, UserStore } from "../stores/user-store";
import { RootStore } from "../stores/root-store";
import CookieManager from 'react-native-cookies'; 

const FULL: ViewStyle = { flex: 1 }

const api = create({
  baseURL: "http://localhost:3000/graphql",
  headers: { "Accept": "application/json" },
})

export interface AuthenticationComponentProps {
  rootStore?: RootStore
  onSuccess?: Function
  onFailure?: Function
}

@inject("rootStore")
@observer
export class AuthenticationComponent extends React.Component<AuthenticationComponentProps, { author: object, person: string, authorJSON: string, displayBrowser: boolean, userStore: UserStore }> {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      author: {},
      authorJSON: "",
      person: "",
      displayBrowser: true,
      userStore: props.rootStore.userStore,
    }
  }

  toggleBrowser() {
    this.setState({ displayBrowser: !this.state.displayBrowser })
  }

  async _onNavigationStateChange(webViewState) {
    console.log("on navigation state change")
    console.log(webViewState.url)

    CookieManager.get(webViewState.url).then((res) => {
      console.log("CookieManager.get =>", res)
    })

    var equalSignIndex = webViewState.url.indexOf("ticket=") + 1
    if (equalSignIndex > 0) {

      var ticket = webViewState.url.substring(equalSignIndex + 6)
      console.log("Parsed Ticket: " + ticket)
      let badTicket = "28939299239"
      await this.state.userStore.authenticate(ticket)
      console.log("Authenticated")
      let authenticated = this.state.userStore.authenticated
      console.log("Post Auth")
      console.log(authenticated)
      if (authenticated) {
        this.props.onSuccess()
      } else {
        console.log("Auth failed")
        CookieManager.clearAll()
        .then((res) => {
          console.log('CookieManager.clearAll =>', res);
          });
        this.props.onFailure()
      }
    }

  }

  checkUser() {
    console.log(this.state.userStore.user)
  }


  render() {
    return (
      <View style={FULL}>
        <StatusBar barStyle="light-content" />
        <WebView
              source={{ uri: 'https://idp.rice.edu/idp/profile/cas/login?service=https://www.riceapps.org' }}
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              style={{ marginTop: 20, display: this.state.displayBrowser ? "flex" : "none" }}
            />
      </View>
    )
  }
}

export default AuthenticationComponent


// queryGetPost = (name) => {
//   api
//     .post(
//       "",
//       {
//         query: `
//         query Author($firstName: String!) {
//         author(filter:$firstName){
//           lastName
//         }
//       }
//       `,
//         variables: {
//           firstName: name,
//         },
//       },
//     ).then(
//       (res: any) => {
//         return this.setState({ author: res.data.data.author[0] })
//       },
//     )
// }


// authenticate = (ticket) => {
//   console.log("authenticating")
//   api
//     .post(
//       "",
//       {
//         query: `
//         mutation Authenticate($ticket: String!) {
//           authenticator(ticket:$ticket) {
//             netID
//           }
//         }
//       `,
//         variables: {
//           ticket: ticket,
//         },
//       },
//     )
//     .then((res) => {
//       let user = res.data.data.authenticator

//       console.log(user)
//       console.log(res)
//     })
// }

        {/* {
          this.state.userStore.loggedIn() ?
        //   this.props.navigation.navigate("Menu") :
        this.props.onSuccess() :
          (
            
          )
        } */}

        {/* <Wallpaper /> */}
        {/* <Button
          style={CONTINUE}
          textStyle={CONTINUE_TEXT}
          tx="firstExampleScreen.continue"
          onPress={() => this.checkUser()}
        />
        <Button
          style={CONTINUE}
          textStyle={CONTINUE_TEXT}
          tx="firstExampleScreen.continue"
          onPress={() => this.toggleBrowser()}
        />
        <WebView
          // source={{uri: 'https://idp.rice.edu/idp/profile/cas/login?service=hedwig://localhost:8080/auth'}}
          source={{uri: 'https://idp.rice.edu/idp/profile/cas/login?service=https://riceapps.org'}}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          style={{marginTop: 20, display: this.state.displayBrowser ? 'flex' : 'none' }}
        />  */}








        {/* <Wallpaper />
        <SafeAreaView style={FULL}>
          <Screen style={CONTAINER} backgroundColor={color.transparent} preset="scrollStack">
          
            <Button
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="firstExampleScreen.continue"
              onPress={() => this.showWeb()}
            />
          </Screen>
        </SafeAreaView> */}