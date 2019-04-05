import React, { Component } from 'react'
import { PushNotificationIOS, Alert } from 'react-native'

import { inject, observer } from "mobx-react" 
import { RootStore } from "./stores/root-store"
import { client } from "./main"
import gql from "graphql-tag"

interface PushNotificationState{
  curr_deviceToken: String
}

interface PushNotificationProps{
  rootStore: RootStore
}

@inject("rootStore")
@observer
export class PushNotificationHandler extends React.Component<PushNotificationProps, PushNotificationState> {
  constructor(props){
    super(props)
  }
  
  componentDidMount() {
    let { rootStore } = this.props;
    console.log('component did mount')
    

    PushNotificationIOS.addEventListener('register', token => {
      console.log("\n\n\n\n\n\n\THIS IS THE TOKEN: "+token+"\n\n");
      this.props.rootStore.userStore.setDeviceToken(token)
      this.props.rootStore.userStore.setNotificationAsked(true)
      this.props.rootStore.userStore.AddTokenToUser()
    })

    PushNotificationIOS.addEventListener('registrationError', registrationError => {
      console.log("\n\n\n USER DID NOT GRANT PERMISSION \n\n\n")
      this.props.rootStore.userStore.setNotificationGranted(true)
      console.log(registrationError, '--')
    })

    PushNotificationIOS.addEventListener('notification', function(notification) {
      if (!notification) {
        return
      }
      const data = notification.getData()
      // handle events
      
      Alert.alert(JSON.stringify({ data }))
    })

    PushNotificationIOS.getInitialNotification().then(notification => {
      if (!notification) {
        return
      }
      const data = notification.getData()
      Alert.alert(JSON.stringify({ data, source: 'ClosedApp' }))
    })

    }

  // componentWillUnmount() {
  //   PushNotificationIOS.removeEventListener('register', (token) => {});
  // }
  render() {
    return null
  }
}

// export default PushNotificationHandler