// The mock structure/data for orders.
// Using this to test out the listItem / list components I am trying to build.

// --------------------- MOCK ORDER STRUCTS ---------------------

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


// --------------------- MOCK ORDERS ---------------------

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

// --------------------- MOCK BATCH STRUCTS ---------------------

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



// This is the schema I am following for the vendor mock data.
// Comes from stripe-connect branch on backend.
// x marks a field I am using:

// --------------------- MOCK VENDOR STRUCTS ---------------------

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

interface SKU {
  _id: string
  active: boolean
  attributes: AttributePair[]
  image: string
  inventory: Inventory
  price: number
  product: string
}

interface AttributePair {
  key: string,
  value: string,
}

interface Inventory {
  quantity: number,
  type: string
  value: string
}

export interface CartItem {
  quantity: number    // Quantity of product
  product: Product    // The product
  sku: string         // Specifies which sku (correponds to _id field in SKU)
}


// --------------------- MOCK PRODUCTS ---------------------
export var TaroMilkTea = {
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
      inventory : {
        quantity : 20,
        type : "idk",
        value : "idk",
      }
    },
  ],
  description : "This is tea. Drink it."
}

export var PearlMilkTea = {...TaroMilkTea};
PearlMilkTea.name = "Pearl Milk Tea";

var LycheeMilkTea = {...TaroMilkTea};
LycheeMilkTea.name = "Lychee Milk Tea";

var ThaiMilkTea = {...TaroMilkTea};
ThaiMilkTea.name = "Thai Milk Tea";

export var mockCart = [
  {
    quantity : 1,
    product: PearlMilkTea,
    sku: "1",
  },
  {
    quantity : 2,
    product: TaroMilkTea,
    sku: "1",
  },
  {
    quantity : 1,
    product: ThaiMilkTea,
    sku: "1",
  },
]


// --------------------- MOCK VENDORS ---------------------


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
    TaroMilkTea,
    PearlMilkTea,
    LycheeMilkTea,
    ThaiMilkTea,
  ]
}

export var realVendors = [
  {
    "name": "East West Tea",
    "phone": "890-887-6219",
    "hours": [
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ]
    ],
    "locationOptions": [
      {
        "_id": "5c3931356e04384b7ecf9cdb",
        "name": "McMurtry Commons"
      }
    ],
    "products": [
      {
        "id": "prod_EJSdVzKZjEi6Tx",
        "name": "Add-Ons",
        "active": true,
        "attributes": [
          "topping"
        ],
        "caption": "Add-on toppings to enhance",
        "images": [],
        "description": null,
        "skuItems": [
          {
            "id": "sku_ELrdB6MbqaGIPg",
            "active": true,
            "attributes": [
              {
                "key": "topping",
                "value": "No Topping"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "infinite",
              "value": null
            },
            "price": 0,
            "product": "prod_EJSdVzKZjEi6Tx"
          },
          {
            "id": "sku_EJSeO8nhj2ZfSH",
            "active": true,
            "attributes": [
              {
                "key": "topping",
                "value": "Oreo"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 0,
            "product": "prod_EJSdVzKZjEi6Tx"
          },
          {
            "id": "sku_EJSd3be15i6mTM",
            "active": true,
            "attributes": [
              {
                "key": "topping",
                "value": "Lychee Jelly"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 0,
            "product": "prod_EJSdVzKZjEi6Tx"
          },
          {
            "id": "sku_EJSdF3WFMyLegJ",
            "active": true,
            "attributes": [
              {
                "key": "topping",
                "value": "Tapioca Pearls"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 0,
            "product": "prod_EJSdVzKZjEi6Tx"
          }
        ]
      },
      {
        "id": "prod_EJSOU3XwmvX5zE",
        "name": "Tea",
        "active": true,
        "attributes": [
          "size",
          "flavor"
        ],
        "caption": "The best tea this side of the RMC",
        "images": [
          "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA2NS81MTEvb3JpZ2luYWwvZ2xhc3MtZnJvZy5qcGc=",
          "https://www.australiangeographic.com.au/wp-content/uploads/2018/06/green-tree-frogs.jpg"
        ],
        "description": null,
        "skuItems": [
          {
            "id": "sku_EJSQkUrs9W9skz",
            "active": true,
            "attributes": [
              {
                "key": "size",
                "value": "Medium"
              },
              {
                "key": "flavor",
                "value": "Thai Milk Tea"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "limited"
            },
            "price": 300,
            "product": "prod_EJSOU3XwmvX5zE"
          },
          {
            "id": "sku_EJSPTm6Ie9Xaco",
            "active": true,
            "attributes": [
              {
                "key": "size",
                "value": "Medium"
              },
              {
                "key": "flavor",
                "value": "Milk Tea"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 300,
            "product": "prod_EJSOU3XwmvX5zE"
          },
          {
            "id": "sku_EJSPwevkJuZNiY",
            "active": true,
            "attributes": [
              {
                "key": "size",
                "value": "Medium"
              },
              {
                "key": "flavor",
                "value": "Earl Grey Milk Tea"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 300,
            "product": "prod_EJSOU3XwmvX5zE"
          }
        ]
      }
    ]
  },
  {
    "name": "The Hoot",
    "phone": "564-095-3826",
    "hours": [
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ],
      [
        20,
        1
      ]
    ],
    "locationOptions": [
      {
        "_id": "5c3931356e04384b7ecf9cda",
        "name": "Sid Rich Commons"
      },
      {
        "_id": "5c3931356e04384b7ecf9cdb",
        "name": "McMurtry Commons"
      }
    ],
    "products": [
      {
        "id": "prod_EM2yVxL6wXlJXS",
        "name": "Chick-fil-a Sandwich",
        "active": true,
        "attributes": [
          "flavor"
        ],
        "caption": "Sandwiches from the OG",
        "images": [],
        "description": null,
        "skuItems": [
          {
            "id": "sku_EM2zSDAj2aGlPZ",
            "active": true,
            "attributes": [
              {
                "key": "flavor",
                "value": "Spicy"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 450,
            "product": "prod_EM2yVxL6wXlJXS"
          },
          {
            "id": "sku_EM2z3FNCLmXW6d",
            "active": true,
            "attributes": [
              {
                "key": "flavor",
                "value": "Regular"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 400,
            "product": "prod_EM2yVxL6wXlJXS"
          }
        ]
      },
      {
        "id": "prod_EM2w2W2i7oSA1M",
        "name": "Chick-fil-a Nuggets",
        "active": true,
        "attributes": [
          "flavor"
        ],
        "caption": "Regular Nuggets",
        "images": [],
        "description": null,
        "skuItems": [
          {
            "id": "sku_EM2xtd2tOr5j5v",
            "active": true,
            "attributes": [
              {
                "key": "flavor",
                "value": "Regular"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 400,
            "product": "prod_EM2w2W2i7oSA1M"
          }
        ]
      },
      {
        "id": "prod_EJaEfo5Mih4o3u",
        "name": "HBCB",
        "active": true,
        "attributes": [],
        "caption": "HubChub from your favorite Whata-bub",
        "images": [],
        "description": null,
        "skuItems": [
          {
            "id": "sku_EJaEJPauJcGunK",
            "active": true,
            "attributes": [],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 400,
            "product": "prod_EJaEfo5Mih4o3u"
          }
        ]
      },
      {
        "id": "prod_EJSfozstvZH8Qg",
        "name": "Pizza",
        "active": true,
        "attributes": [
          "size",
          "topping"
        ],
        "caption": "Papa John's Coming Through",
        "images": [
          "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        ],
        "description": "The thing about pizza is that everyone generally likes it, but we aim to be the exception by making pizza no one likes. Buy it!",
        "skuItems": [
          {
            "id": "sku_EJSfIsb4QZ5IWP",
            "active": true,
            "attributes": [
              {
                "key": "size",
                "value": "Half"
              },
              {
                "key": "topping",
                "value": "Pepperoni"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 450,
            "product": "prod_EJSfozstvZH8Qg"
          },
          {
            "id": "sku_EJSfWXATlApb0D",
            "active": true,
            "attributes": [
              {
                "key": "size",
                "value": "Whole"
              },
              {
                "key": "topping",
                "value": "Pepperoni"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 900,
            "product": "prod_EJSfozstvZH8Qg"
          },
          {
            "id": "sku_EJSfuA1NBctFGk",
            "active": true,
            "attributes": [
              {
                "key": "size",
                "value": "Half"
              },
              {
                "key": "topping",
                "value": "Cheese"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 450,
            "product": "prod_EJSfozstvZH8Qg"
          },
          {
            "id": "sku_EJSfFqFDkaV99I",
            "active": true,
            "attributes": [
              {
                "key": "size",
                "value": "Whole"
              },
              {
                "key": "topping",
                "value": "Cheese"
              }
            ],
            "image": null,
            "inventory": {
              "quantity": null,
              "type": "bucket",
              "value": "in_stock"
            },
            "price": 900,
            "product": "prod_EJSfozstvZH8Qg"
          }
        ]
      }
    ]
  }
]