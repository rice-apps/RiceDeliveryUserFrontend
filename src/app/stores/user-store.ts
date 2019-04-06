import { types, destroy } from "mobx-state-tree";
import { client } from "../main";
import gql from "graphql-tag";
import { AsyncStorage } from "react-native";

const ADD_DEVICETOKEN = gql`
mutation AddToken($netID: String!, $token:String! ){
  addDeviceToken(netID: $netID, token: $token){
    deviceToken
  }
}
`
const AUTHENTICATION = gql`
    mutation Authenticate($ticket: String!, $checkVendor: Boolean!, $vendorName: String) {
        authenticator(ticket:$ticket, checkVendor:$checkVendor, vendorName:$vendorName) {
            netID
            firstName
            lastName
            phone
            customerIDArray {
                accountID
                customerID
            }
            deviceToken
        }
    }    
`

const GET_USER = gql`
    query GET_USER($netID: String!) {
        user(netID:$netID) {
            netID
            firstName
            lastName
            phone
            customerIDArray {
                accountID
                customerID
            }
            deviceToken
        }
    }
`

const CustomerIDPair = types
.model('CustomerIDPair', {
    accountID: types.maybe(types.string),
    customerID: types.maybe(types.string)
});

 const User = types
.model("User", {
    // _id: types.string,
    netID: types.optional(types.string, ""),
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    customerIDArray: types.optional(types.array(CustomerIDPair), []),
    deviceToken: types.optional(types.array(types.string), [])
    // defaultLocation: types.optional(Location, {name: ""}),
})


export const UserStoreModel = types
.model("UserStoreModel", {
    user : User,
    authenticated: types.optional(types.boolean, false),
    curr_deviceToken: types.optional(types.string, "12343"),
    hasAccount: types.optional(types.boolean, false),
    notification_asked: types.optional(types.boolean, false),
    notification_granted: types.optional(types.boolean, false)
})
.actions(
    (self) => ({
        async authenticate(ticket) {
            let user = await client.mutate({
                mutation: AUTHENTICATION,
                variables: {
                    ticket: ticket,
                    checkVendor: false,
                    vendorName: ""
                }
            });
            self.setAuth(true)
            if (user.data.authenticator.firstName != null) {
                self.setUser(user.data.authenticator)
                self.setAccountState(true)
            } else {
                self.setUser({ netID: user.data.authenticator.netID })
                self.setAccountState(false)
            }

        },
        async AddTokenToUser(){
            if (self.notification_granted){
                try {
                    let addToken = await client.mutate({
                        mutation: ADD_DEVICETOKEN,
                        variables: {
                        netID: self.user.netID,
                        token: self.curr_deviceToken
                        }
                    })
                    self.setDeviceTokenArray(addToken.data.deviceToken)
                } catch(err) {
                    console.log("\n\n\n\n" + err + "\n\n\n\n\n")
                
                }
            }
          },
        setDeviceTokenArray(tokenArr){            
            self.user.deviceToken = tokenArr
        },
        setDeviceToken(token){
            self.curr_deviceToken = token
        },
        setUser(user) {
            self.user = user
        },
        setAccountState(accountState) {
            self.hasAccount = accountState
        },
        setNotificationAsked(status){
            self.notification_asked = status
        },
        setNotificationGranted(status){
            self.notification_granted = status
        },
        setAuth(authState) {
            self.authenticated = authState;
        },
        async getUserFromNetID(netID) {
            console.log("Pre netID thing");
            let data = await client.query({
                query: GET_USER,
                variables: {
                    netID: netID
                }
            });
            
            console.log("Post netID gt");
            console.log(data.data.user[0]);
            let user = data.data.user[0];

            // Set user
            self.setUser(user);
            // Set account
            self.setAccountState(true);
            // Set auth
            self.setAuth(true);
        }
    })
)

 export type UserStore = typeof UserStoreModel.Type


