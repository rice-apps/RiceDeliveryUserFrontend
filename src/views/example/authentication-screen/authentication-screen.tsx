import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, StatusBar, TextInput } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { inject, observer } from "mobx-react"
import { create } from 'apisauce'
import { Text } from "../../shared/text"
import { Button } from "../../shared/button"
import { Screen } from "../../shared/screen"
import { Wallpaper } from "../../shared/wallpaper"
import { Header } from "../../shared/header"
import { color, spacing } from "../../../theme"
import { bowserLogo } from "./"
// Linking
import { Platform, Linking, WebView } from 'react-native';
import { UserStoreModel, UserStore } from "../../../app/stores/user-store";
import { RootStore } from "../../../app/stores/root-store";
import { NavigationEvents } from "../../../navigation/navigation-events";

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const api = create({
  baseURL: "http://localhost:3000/graphql",
  headers: { 'Accept': 'application/json' }
});

export interface AuthenticationScreenProps extends NavigationScreenProps<{}> {
  rootStore?: RootStore
}

@inject("rootStore")
@observer
export class AuthenticationScreen extends React.Component<AuthenticationScreenProps, { author: object, person: string, authorJSON: string, displayBrowser: boolean, userStore: UserStore }> {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      author: {},
      authorJSON: "",
      person: "",
      displayBrowser: false,
      userStore: props.rootStore.userStore
    };
  }

  queryGetPost = (name) => {
    api
      .post(
        '',
        {
          query: `
          query Author($firstName: String!) {
          author(filter:$firstName){
            lastName
          }
        }
        `,
          variables: {
            firstName: name
          },
        }
      ).then(
        (res: any) => {
          return this.setState({ author: res.data.data.author[0] });
        }
      );
  }

  toggleBrowser() {
    this.setState({ displayBrowser: !this.state.displayBrowser });
  }


  authenticate = (ticket) => {
    api
      .post(
        '',
        {
          query: `
          mutation Authenticate($ticket: String!) {
            authenticator(ticket:$ticket) {
              netID
            }
          }
        `,
          variables: {
            ticket: ticket
          }
        }
      )
      .then((res) => {
        let user = res.data.data.authenticator;

        console.log(user);
        console.log(res);
      });
  }

  async _onNavigationStateChange(webViewState) {
    console.log(webViewState.url);

    var equalSignIndex = webViewState.url.indexOf('ticket=') + 1;
    if (equalSignIndex > 0) {

      var ticket = webViewState.url.substring(equalSignIndex + 6);
      console.log("Parsed Ticket: " + ticket);
      let badTicket = "28939299239";
      this.state.userStore.authenticate(badTicket);
      console.log("Authenticated");
      // let authenticated = this.state.userStore.authenticated;
      console.log("Post Auth");
      console.log(authenticated);
      if (authenticated) {
        this.props.navigation.navigate("Menu");
      } else {
        this.props.navigation.replace("Login");
      }
    }

  }

  checkUser() {
    console.log(this.state.userStore.user);
  }


  render() {
    return (
      <View style={FULL}>
        <StatusBar barStyle="light-content" />
        {this.state.userStore.user ?
          this.props.navigation.navigate("Menu") :
          (
            <WebView
              // source={{uri: 'https://idp.rice.edu/idp/profile/cas/login?service=hedwig://localhost:8080/auth'}}
              source={{ uri: 'https://idp.rice.edu/idp/profile/cas/login?service=https://riceapps.org' }}
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              style={{ marginTop: 20, display: this.state.displayBrowser ? 'flex' : 'none' }}
            />
          )
        }
        }}

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
      </View>
    )
  }
}
