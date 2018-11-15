import { types, destroy } from "mobx-state-tree";
import { client } from '../main';
import gql from "graphql-tag";


// Queries
const GET_USERS = gql`
    {
        user {
            firstName
        }
    }
`

const ADD_USER = gql`
    mutation CreateUser($netid: String!, $firstName: String!, $lastName: String!){
        createUser(input:{
            netid:$netid
            firstName:$firstName
            lastName:$lastName
        }) {
            _id
            netid
            firstName
            lastName
        }
    }
`

 const User = types
.model('User', {
    netid: types.string,
    firstName: types.string,
    lastName: types.string,
    phone: types.string,
    stripeId: types.string,
    defaultLocation: types.string,
    access: types.string
})
.actions(
    (self) => ({
        updateFirstName(firstName) {
            self.firstName = firstName;
        }
    })
)

export const UserStoreModel = types
.model('UserStoreModel', {
    users : types.array(User)
})
.actions(
    (self) => ({
        async getUsers() {
            // Fetch from backend
            let dataObject = await client.query({
                query: GET_USERS
            });
            return dataObject.data;
        },
        async addUser(netid, firstName, lastName) {
            let dataObject = await client.mutate({
                mutation: ADD_USER,
                variables: {
                    netid: netid,
                    firstName: firstName,
                    lastName: lastName
                }
            });
            return dataObject.data;
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
