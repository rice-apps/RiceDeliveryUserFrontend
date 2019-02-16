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


// This is the schema I am following for the vendor mock data.
// Comes from stripe-connect branch on backend.
// x marks a field I am using:


export interface Vendor {
  _id: string,
  name: string,
  hours: number[][],
  // users: string[],
  phone: string,
  locationOptions: [Location]
  products: [Product]
  // orders: [Order]
  // batches: [Batches]
}

export interface Location {
  _id: string
  name: string
}

export interface SKU {
  _id: string
  active: boolean
  attributes: [AttributePair]
  image: string
  inventory: number
  price: number
  product: string
}

export interface AttributePair {
  key: string,
  value: string,
}

export interface Product {
  _id: string,
  active: boolean,
  name: string,
  attributes: string[],
  caption: string,
  images: string[],
  skuItems: SKU[],
  description: String,
}


export var EastWestTea = {
  _id : 10,
  name : "East West Tea",
  hours : [[10, 12], [11, 1], [10, 2], [9, 12], [10, 12], [11, 1], [10, 2]],
  phone : "123-456-7890",
  locationOptions: [
    {
      id : "1",
      name : "Jones",
    },
    {
      id : "2",
      name : "Martel",
    },
    {
      id : "3",
      name : "Brown",
    },
    {
      id : "4",
      name : "Sid",
    },
  ],
  products : [
    {
      _id : "1",
      active : true,
      attributes : [ "Good", "Idk"],
      caption : "This is a caption",
      images : ["link", "to", "image"],
      name : "Taro Milk Tea",
      skuItems : [
        {
          _id : "1",
          active : true,
          attributes : [
            {
              key: "Size",
              value: "Small",
            },
            {
              key: "Flavor",
              value: "Taro",
            },
          ],
          image : "image",
          price : 4,
          product : "idkwhatishere",
        },
      ],
      description : "This is tea. Drink it."
    },
  ]
}