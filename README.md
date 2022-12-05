# Welcome from TK-Graphics E-commerce API

This is an API for TK-Graphics store front website. 

**Services Used**
- Redis
- MongoDB
- AWS (S3)

**Required ENV Variables**

- ADMIN_USER
- API_URL
- AWS_REGION
- AWS_BUCKET
- AWS_S3_DOMAIN
- AWS_SECRET_ACCESS_KEY
- AWS_ACCESS_KEY_ID
- ORIGIN
- JWT_SECRET
- DATABASE_URL

**API HTTP REQUEST EXAMPLES**

###### Get all orders
```
/admin/order/getAll
```

  This route will return all orders

```javascript
const data = await fetch('/admin/order/getAll', {
  method: "GET", 
  headers: {
    user: process.env.ADMIN_USER,
  }
})

```

Example Response 
```javascript
[
  {
    orderId: "O1670252018110:2:1",
    orderStatus: "PENDING",
    customerId: "2299770097",
    orderItems: [
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/150",
        qty: 1,
      },
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/130",
        qty: 2,
      },
    ]
  }
]
```

###### Get an order
```
/admin/order/:orderId
```

  This route will an order with specified orderId

```javascript
const data = await fetch(`/admin/order/${orderId}`, {
  method: "GET", 
  headers: {
    user: process.env.ADMIN_USER,
  }
})

```

Example Response 
```javascript
{
  orderId: "O1670252018110:2:1",
  orderStatus: "PENDING",
  customerId: "2299770097",
  orderItems: [
    {
      productId: "7886",
      imageURL: "https://via.placeholder.com/150",
      qty: 1,
    },
    {
      productId: "7886",
      imageURL: "https://via.placeholder.com/130",
      qty: 2,
    },
  ]
}
```
###### Get all orders by date
```
/admin/order/searchOrdersByDate
```

  This route will return all orders within specified date

```javascript
const data = await fetch('/admin/order/searchOrdersByDate', {
  method: "GET", 
  headers: {
    user: process.env.ADMIN_USER,
  },
  body: JSON.stringify({
    from: Date,
    to: Date (one month ago)
  })
})

```

Example Response 
```javascript
[
  {
    orderId: "O1670252018110:2:1",
    orderStatus: "PENDING",
    customerId: "2299770097",
    orderItems: [
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/150",
        qty: 1,
      },
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/130",
        qty: 2,
      },
    ]
  }
]
```

###### Get all orders by customerId
```
/admin/order/searchOrdersByCustomerId
```

  This route will return all orders from specified customer

```javascript
const data = await fetch('/admin/order/searchOrdersByCustomerId', {
  method: "GET", 
  headers: {
    user: process.env.ADMIN_USER,
  },
  body: JSON.stringify({
    customerId: "2299770097",
    from: Date,
    to: Date (one month ago)
  })
})

```

Example Response 
```javascript
[
  {
    orderId: "O1670252018110:2:1",
    orderStatus: "PENDING",
    customerId: "2299770097",
    orderItems: [
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/150",
        qty: 1,
      },
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/130",
        qty: 2,
      },
    ]
  }
]
```
###### Get all orders by productId
```
/admin/order/searchOrdersByProductId
```

  This route will return all orders with specified product

```javascript
const data = await fetch('/admin/order/searchOrdersByProductId', {
  method: "GET", 
  headers: {
    user: process.env.ADMIN_USER,
  },
  body: JSON.stringify({
    product: "7886",
    from: Date,
    to: Date (one month ago)
  })
})

```

Example Response 
```javascript
[
  {
    orderId: "O1670252018110:2:1",
    orderStatus: "PENDING",
    customerId: "2299770097",
    orderItems: [
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/150",
        qty: 1,
      },
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/130",
        qty: 2,
      },
    ]
  }
]
```

###### Get all orders by order status
```
/admin/order/searchOrdersByOrderStatus
```

  This route will return all orders with specified order status

```javascript
const data = await fetch('/admin/order/searchOrdersByOrderStatus', {
  method: "GET", 
  headers: {
    user: process.env.ADMIN_USER,
  },
  body: JSON.stringify({
    status: "PENDING",
    from: Date,
    to: Date (one month ago)
  })
})

```

Example Response 
```javascript
[
  {
    orderId: "O1670252018110:2:1",
    orderStatus: "PENDING",
    customerId: "2299770097",
    orderItems: [
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/150",
        qty: 1,
      },
      {
        productId: "7886",
        imageURL: "https://via.placeholder.com/130",
        qty: 2,
      },
    ]
  }
]
```

###### Update order status
```
/admin/order/updateOrderStatus
```

  This route will update the status of specified order

```javascript
const data = await fetch('/admin/order/updateOrderStatus', {
  method: "PUT", 
  headers: {
    user: process.env.ADMIN_USER,
  },
  body: JSON.stringify({
    orderId: "O1670252018110:2:1",
    status: "PROCESSING",
  })
})

```

Example Response 
```javascript
{
  orderId: "O1670252018110:2:1",
  orderStatus: "PROCESSING",
  customerId: "2299770097",
  orderItems: [
    {
      productId: "7886",
      imageURL: "https://via.placeholder.com/150",
      qty: 1,
    },
    {
      productId: "7886",
      imageURL: "https://via.placeholder.com/130",
      qty: 2,
    },
  ]
}
```

###### Delete Order
```
/admin/order/deleteOrder
```

  This route will delete an order

```javascript
const data = await fetch('/admin/order/deleteOrder', {
  method: "PUT", 
  headers: {
    user: process.env.ADMIN_USER,
  },
  body: JSON.stringify({
    orderId: "O1670252018110:2:1",
  })
})

```

**Teach Stack**

- Typescript 
- Node.js (Nest.js) 
- Prisma (ORM)