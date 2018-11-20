import { types, destroy } from "mobx-state-tree";

 export const User = types
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
    user : types.optional(User, {})
})
 export type UserStore = typeof UserStoreModel.Type
