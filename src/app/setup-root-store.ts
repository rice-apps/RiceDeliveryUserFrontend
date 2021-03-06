import { onSnapshot } from "mobx-state-tree"
import { RootStoreModel, RootStore } from "./stores/root-store"
import { Environment } from "./environment"
import * as storage from "../lib/storage"
import { Reactotron } from "../services/reactotron"
import { Api } from "../services/api"
import { create } from 'apisauce'
import { AsyncStorage } from "react-native";
import { client } from "./main";
import gql from "graphql-tag";
// import { OrderStoreModel } from "./stores/order-store";

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

const api = create({
  baseURL: "http://localhost:3000/graphql",
  headers: {"Accept": "application/json"},
})

const vendorQuery = `
  query vendors{
    vendor{
      _id
      name
      phone
      locationOptions{
        name
      }
      menu{
        id
        name
        description
        inventory
        prices{
          size
          price
        }
      }
    }
  }
  `

const GET_USER = gql`
  query GET_USER($netID: String!) {
      user(netid:$netID) {
          netID
          firstName
          lastName
          phone
          creditToken
      }
  }
`;

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  try {
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}

    // Get vendors
    let vendorRes: any = await api.post('', { query: vendorQuery, })
    data.vendorStore = {"vendor": vendorRes.data.data.vendor};

    rootStore = RootStoreModel.create(data, env)
  } catch(e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, snapshot => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  return rootStore
}

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()

  // create each service
  env.reactotron = new Reactotron()
  env.api = new Api()

  // allow each service to setup
  await env.reactotron.setup()
  await env.api.setup()

  return env
}
