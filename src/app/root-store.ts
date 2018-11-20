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
  
  //user is empty here, but in our order screen we pull the
  //user's data directly from user-store.ts
  userStore: types.optional(UserStoreModel, { user : {}}), 
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
