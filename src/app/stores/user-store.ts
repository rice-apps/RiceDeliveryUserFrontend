import { types, destroy, flow } from "mobx-state-tree";
import { client } from "../main";
import gql from "graphql-tag";
import { AsyncStorage } from "react-native";
import { toJS } from "mobx";

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
            last4
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
            last4
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
    deviceToken: types.optional(types.array(types.string), []),
    last4: types.maybe(types.string)
    // defaultLocation: types.optional(Location, {name: ""}),
})


export const UserStoreModel = types
.model("UserStoreModel", {
    user : User,
    authenticated: types.optional(types.boolean, false),
    curr_deviceToken: types.optional(types.string, ""),
    hasAccount: types.optional(types.boolean, false),
    notification_asked: types.optional(types.boolean, false),
    notification_granted: types.optional(types.boolean, false)
})
.actions(
    (self) => ({
        authenticate: flow(function * authenticate(ticket) {
            console.log("I'm here baby")
            let user = yield client.mutate({
                mutation: AUTHENTICATION,
                variables: {
                    ticket: ticket,
                    checkVendor: false,
                    vendorName: ""
                }
            });
            self.authenticated = true
            console.log("NULL" + user.data.authenticator)
            if (user.data.authenticator !== null && user.data.authenticator.firstName !== null) {
                console.log("CHECKING AUTHENTICATOR")
                console.log(user.data.authenticator)
                self.user = user.data.authenticator
                self.hasAccount = true
            }
        }),
        async AddTokenToUser(){
            console.log("add token")
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
        getUserFromNetID: flow(function * getUserFromNetID(netID) {
            console.log("Pre netID thing");
            let data = yield client.query({
                query: GET_USER,
                variables: {
                    netID: netID
                }
            });
            
            console.log("Post netID gt");

            let user = data.data.user[0];
            // Set user
            self.user = (user);
            // Set account
            self.hasAccount = (true);
            // Set auth
            self.authenticated = (true);
        }),
        updateUser: flow(function * updateUser(infoToUpdate) {
            // update the user.
            const updatedUserInfo = yield client.mutate({
                mutation: gql`
                mutation mutate($data: UpdateUserInput!) {
                  updateUser(data: $data) {
                    netID
                    firstName
                    lastName
                    last4
                    phone
                    customerIDArray {
                        accountID
                        customerID
                    }
                    deviceToken
                  }
                }
                `
                , 
                variables : {
                  data: infoToUpdate
              }
              });
            self.user = (updatedUserInfo.data.updateUser)
            return self.user
        }),
        saveCreditInfo(last4) {
            self.user.last4 = last4
        },
        getUser: flow(function * getUser(netID) {
            const userInfo = yield client.query({
                query: gql`
                query user($data: String!) {
                  user(netID: $data) {
                    netID
                    firstName
                    lastName
                    last4
                    phone
                    customerIDArray {
                        accountID
                        customerID
                    }
                    deviceToken
                  }
                }
                `
                ,
                variables: {
                  data: netID
                }
              });
              self.user = userInfo.data.user[0]
              return self.user
        })
    })
)

 export type UserStore = typeof UserStoreModel.Type


