import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation/navigation-store"
import { UserStoreModel }  from "./stores/user-store"
import { VendorStoreModel }  from "./stores/vendorStore"
import { OrderStoreModel } from "./stores/order-store"
import { CartStoreModel } from "./stores/cart-store";
/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  userStore: types.optional(UserStoreModel, {
    user: {}
  }),
  // userStore: types.optional(UserStoreModel, { users: [] }),
  vendorStore: types.optional(VendorStoreModel, {vendor : []}),
  orderStore: types.optional(OrderStoreModel, {orders : []}),
  cartStore: types.optional(CartStoreModel, {cartItems: []})
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
