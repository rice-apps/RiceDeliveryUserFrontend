import { types, destroy } from "mobx-state-tree";

const User = types
.model('User', {
    _id: types.optional(types.string, ""),
    netid: types.optional(types.string, ""),
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    stripeId: types.optional(types.string, ""),
    defaultLocation: types.optional(types.string, ""),
    access: types.optional(types.string, "")
})

export const UserStoreModel = types
.model('UserStoreModel', {
    user : types.optional(User, {
            netid: "Lyla.Nicolas",
            firstName: "Will",
            lastName: "James",
            phone: "780-594-8541",
            stripeId: "0123",
            defaultLocation: "5bca4c408f2c68f7ba37422e",
            access: "Employee"
        } )
})


 export type UserStore = typeof UserStoreModel.Type
