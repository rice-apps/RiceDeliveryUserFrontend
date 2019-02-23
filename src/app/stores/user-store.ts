import { types, destroy } from "mobx-state-tree";
import { client } from "../main";
import gql from "graphql-tag";
// import { Location } from "./vendor-store";

const AUTHENTICATION = gql`
    mutation Authenticate($ticket: String!) {
        authenticator(ticket:$ticket) {
            netID
            firstName
            lastName
            phone
        }
    }    
`

 const User = types
.model('User', {
    // _id: types.string,
    netID: types.optional(types.string, ""),
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    // defaultLocation: types.optional(Location, {name: ""}),
})


export const UserStoreModel = types
.model('UserStoreModel', {
    user : User,
    authenticated: types.optional(types.boolean, false)
})
.actions(
    (self) => ({
        async authenticate(ticket) {
            console.log("HERE");
            let user = await client.mutate({
                mutation: AUTHENTICATION,
                variables: {
                    ticket: ticket
                }
            });
            console.log(user.data.authenticator);

            console.log("Almost authenticated");
            
            if (user.data.authenticator) {
                self.setUser(user.data.authenticator);
                self.setAuth(true);
            }

            // api
            // .post(
            // '',
            // {
            //     query: `
            //     mutation Authenticate($ticket: String!) {
            //         authenticator(ticket:$ticket) {
            //         netID
            //         }
            //     }
            //     `,
            //     variables: {
            //     ticket: ticket
            //     }
            // }
            // )
            // .then((res) => {
            // let user = res.data.data.authenticator;
            
            // console.log(user);
            // console.log(res);
            // });
        },
        setUser(user) {
            self.user = user;
        },
        loggedIn() {
            return self.authenticated ? true : false
        },
        setAuth(authState) {
            self.authenticated = authState;
        }
    })
)

// .create({
//      users : [{
//          netid: "Lyla.Nicolas",
//         firstName: "Will",
//         lastName: "James",
//         phone: "780-594-8541",
//         stripeId: "0123",
//         defaultLocation: "5bca4c408f2c68f7ba37422e",
//         access: "Employee"
//     }]
//  })
 //export type NavigationStore = typeof NavigationStoreModel.Type

 export type UserStore = typeof UserStoreModel.Type




// .actions(self => ({
//     toggleVip(){
//         self.vip = !self.vip
//     }
// }
// ))


//  const UserStore = types
// .model('UserNames', {
//     names: types.array(UserName)
// })
// .actions(self =>({
//     addUser(user) {
//         self.names.push(user)
//     },
//     removeUser(user) {
//         destroy(user)
//     }
// })
// )
// .create({
//      names: [{name: "William Su", vip: true}]
//  })