// Welcome to the main entry point.
//
// In this file, we'll be kicking off our app or storybook.

import { AppRegistry } from "react-native"
import { RootComponent } from "./root-component"
import { StorybookUIRoot } from "../../storybook"

// Apollo Imports
import {ApolloClient} from "apollo-client"
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-boost";

/**
* Initializing Apollo Client. We'll use this to make 
*/
// const link = createHttpLink({
//   uri: "http://localhost:3000/graphql",
// })

// Showing All Messages
// + IP=192.168.1.70

// 10.115.179.58



// Showing All Messages
// + IP=10.70.56.136



// const link = createHttpLink({
//   uri: "localhost:3000/graphql",
// })

const link = createHttpLink({
  uri:"https://hedwig-233703.appspot.com/graphql"
})

export const client = new ApolloClient({
   link: link,
   cache: new InMemoryCache(),
   defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  }
 })


/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "Hedwig"

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false

// appease the typescript overlords
declare global {
  var module
}

if (SHOW_STORYBOOK && __DEV__) {
  // 🎗 REMINDER: Storybook has a server you need to run from a terminal window.
  //
  // $> yarn run storybook
  //
  AppRegistry.registerComponent(APP_NAME, () => StorybookUIRoot)
} else {
  // load our app
  AppRegistry.registerComponent(APP_NAME, () => RootComponent)
}
