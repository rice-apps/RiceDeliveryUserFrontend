// The mock structure/data for orders.
// Using this to test out the listItem / list components I am trying to build.

var order1 = {
    id : 6969,
    user : {
      firstName : "Jonathan",
      lastName : "Cai",
    },
    status : {
      pending : "01/29/19 10:12PM",
      onTheWay: "01/29/19 10:21PM", 
      fulfilled: "01/29/19 10:40PM", 
      unfulfilled: false,
    }, 
    location : "Jones",
    items : [
      { item : {
          id : 1,
        itemName : "Pizza",
        },
        quantity : 2,
      },
      { item : {
          id : 2,
        itemName : "Banh Mi",
        },
        quantity : 4,
      },
      { item : {
          id : 3,
        itemName : "Cane's",
        },
        quantity : 1,
      },
    ],
  }

var order2 = {
    id : 333,
    user : {
      firstName : "Justin",
      lastName : "Fan",
    },
    status : {
      pending : "01/29/19 10:01PM",
      onTheWay: "01/29/19 10:05PM", 
      fulfilled: "01/29/19 10:40PM", 
      unfulfilled: false,
    }, 
    location : "Martel",
    items : [
      { item : {
          id : 1,
        itemName : "CFA Nuggets",
        },
        quantity : 3,
      },
      { item : {
          id : 2,
        itemName : "HBCB",
        },
        quantity : 1,
      },
    ],
}

var order3 = {
  id : 4444,
  user : {
    firstName : "Amy",
    lastName : "Huyen",
  },
  status : {
    pending : "01/29/19 10:01PM",
    onTheWay: "01/29/19 10:05PM", 
    fulfilled: "01/29/19 10:40PM", 
    unfulfilled: false,
  }, 
  location : "Brown",
  items : [
    { item : {
        id : 1,
      itemName : "CFA Nuggets",
      },
      quantity : 3,
    },
    { item : {
        id : 2,
      itemName : "HBCB",
      },
      quantity : 1,
    },
  ],
}

export var mock_orders = {
    order1 : order1,
    order2 : order2,
    order3 : order3,
}

export var mock_batches = {
  batch1 : {
    batchNumber : 1,
    orders : [
      order1,
      order2,
    ]
  },
  batch2 : {
    batchNumber : 2,
    orders : [
      order3,
    ]
  },
}

export default interface Order {
    id : number
    user : {
        firstName : string,
        lastName : string,
    },
    status : {
        pending : string,
        onTheWay: string, 
        fulfilled: string, 
        unfulfilled: boolean,
    }, 
    location : string,
    items : OrderItem[],
}
 
interface OrderItem {
    item : {
        itemName : string,
    },
    quantity : number,
}

export interface Batch {
  batchNumber : number,
  orders : Order[],
}


// export interface Vendor {
//   name : string,
//   hours : number[][],
//   locationOptions {
//     _id
//     name
//   }
// }


export interface Vendor {
  _id: string,
  name: string,
  hours: number[][],
  // users: string[],
  phone: string,
  // locationOptions: [Location]
  products: [Product]
  // orders: [Order]
  // batches: [Batches]
}

export interface SKU {
  _id: string
  // active: boolean
  // attributes: [AttributePair]
  image: string
  // inventory: Inventory
  price: number
  product: string
}

export interface Product {
  _id: string,
  active: boolean,
  attributes: string[],
  caption: string,
  images: string[],
  skuItems: SKU[],
  description: String,
}


var EastWestTea = {
  _id : 10,
  name : "East West Tea",
  hours : [[10, 12], [11, 1], [10, 2], [9, 12], [10, 12], [11, 1], [10, 2]],
  phone : "123-456-7890",
  products : [
    {
      _id : 1,
      name : "Taro Milk Tea",
      
    },
  ]
}