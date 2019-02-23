import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { UserStoreModel }  from "./user-store"
import { VendorStoreModel }  from "./vendor-store"
import { OrderModel } from "./order-store"

// import { CartStoreModel } from "./cart-store";
/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  userStore: types.optional(UserStoreModel, {
    user: {}
  }),
  vendorStore: types.optional(VendorStoreModel, {vendor : []}),
  orderStore: types.optional(OrderModel, {pending : []}),
  // cartStore: types.optional(CartStoreModel, {cartItems: []})
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
