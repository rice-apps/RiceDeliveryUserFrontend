// Welcome to the main entry point.
//
// In this file, we'll be kicking off our app or storybook.

import { AppRegistry } from "react-native"
import { RootComponent } from "./root-component"
import { StorybookUIRoot } from "../../storybook"

// Apollo Imports
import { ApolloClient } from 'apollo-client';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory'

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

/**
 * Initializing Apollo Client. We'll use this to make 
 */
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "testIgniteProject"

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
