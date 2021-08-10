const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const Products = require("../models/products")
const sgMail = require("@sendgrid/mail");

class Order {
  static async fetchOrderById(orderId) {
    const result = await db.query(
      `
          SELECT orders.id AS "orderId",
                orders.completed AS "completed",
                orders.delivery_address AS "delivery_address",
                orders.placed_at AS "placed_at"
          FROM orders
          WHERE orders.id = $1
        `,
      [orderId]
    );

    return result.rows;
  }

  static async fetchOrderDetailById(orderId) {
    const result = await db.query(
      `
          SELECT order_detail.order_id AS "order_id",
                order_detail.product_id AS "product_id",
                order_detail.quantity AS "quantity",
                order_detail.completed,
                order_detail.created_at
          FROM order_detail
          WHERE order_detail.order_id = $1
        `,
      [orderId]
    );

    return result.rows;
  }

  static async completeOrderDetail(orderId) {
    const query = `
    UPDATE order_detail
    SET completed = TRUE
    WHERE order_detail.order_id  = $1`
    const result = await db.query(query, [orderId.orderId])

    return await Order.fetchOrderDetailById(orderId.orderId);
  }

  static async fetchAllOrderDetail() {
    const result = await db.query(
      `
          SELECT order_detail.order_id AS "order_detail_id",
                order_detail.product_id AS "product_id",
                order_detail.quantity AS "quantity",
                order_detail.completed
          FROM order_detail
        `,
    );

    return result.rows;
  }

  static async fetchAllWorkingOrderDetail() {
    const result = await db.query(
      `
      SELECT DISTINCT ON (order_detail.order_id) order_detail.order_id, created_at, delivery_address
          FROM order_detail
          INNER JOIN orders ON order_detail.order_id = orders.id
          WHERE order_detail.completed = FALSE
          ORDER BY order_id ASC
         
        `,
    );

    return result.rows;
  }

  static async fetchAllPastOrderDetail() {
    const result = await db.query(
      `
      SELECT DISTINCT ON (order_detail.order_id) order_detail.order_id, created_at, delivery_address
          FROM order_detail
          INNER JOIN orders ON order_detail.order_id = orders.id
          WHERE order_detail.completed = TRUE
          ORDER BY order_id ASC
         
        `,
    );

    return result.rows;
  }

  static async listOrdersForUser({ user }) {
    const query = `
        SELECT orders.id,
            orders.completed AS "completed",
            orders.delivery_address AS "delivery_address",
            orders.placed_at AS "placed_at"
          FROM orders
            JOIN users ON users.id = orders.customer_id
          WHERE orders.customer_id = (SELECT id FROM users WHERE email = $1)
        `;
    const result = await db.query(query, [user.email]);

    return result.rows;
  }

  static async createOrder({ cart, user }) {
    if (!user) {
      throw new BadRequestError("No user provided");
    }
    if (!cart) {
      throw new BadRequestError("No cart provided");
    }
    // const requiredFields = ["cart"]
    // requiredFields.forEach(field =>{
    //     if(!order.hasOwnProperty(field)){
    //         throw new BadRequestError(`Required field - ${field} - missing from request body.`)
    //     }
    // })

    // create a new order to user

    // id                    SERIAL PRIMARY KEY,
    // customer_id           INTEGER REFERENCES users(id) ON DELETE CASCADE,
    // completed             BOOLEAN DEFAULT FALSE,
    // delivery_address      TEXT DEFAULT 'Pick_up',
    // placed_at             TIMESTAMP NOT NULL DEFAULT NOW()

    const orderResult = await db.query(
      `
      INSERT INTO orders (customer_id, delivery_address) 
      VALUES ((SELECT id FROM users WHERE email = $1), $2)
      RETURNING id,
                completed,
                delivery_address,
                placed_at AS "placed_at"
    `,
      [user.email, cart.cart.address]
    );
    // get orderID
    const orderID = orderResult.rows[0].id;

    return await Order.fetchOrderById(orderID);
  }

  static async createOrderDetail({ order, user, cart }) {
    if (!user) {
      throw new BadRequestError("No user provided");
    }
    if (!cart) {
      throw new BadRequestError("No cart provided");
    }

    // create a new order_detail to user

    // order_id    INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    // product_id  INTEGER REFERENCES products(id) ON DELETE CASCADE,
    // quantity    INTEGER NOT NULL,
    // completed   BOOLEAN DEFAULT FALSE,
    // discount    INTEGER DEFAULT 0,
    // -- user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    // PRIMARY KEY (product_id,order_id),
    // created_at  TIMESTAMP NOT NULL DEFAULT NOW()

    let arr = cart.cart.products;
    //console.log(arr.length)
    let emailText = ""
    let totalCost = 0
    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      let productName = Object.keys(obj)[0]; //LOOKUP product name in products to get productID type Integer
      let id = await Products.fetchProductByName(productName)
      let productId =  id[0].productId // grab the productID for each product
      let quantity = Number(obj[productName]);
      let price = id[0].price
      let cost = price * quantity
    //   console.log(order[0].orderId)
    //   console.log(productId)
    //   console.log(quantity)
      totalCost = totalCost + cost
      let productRowText =  productName + " : " + String(price) + " x " + String(quantity) + " = " + String(cost)
      emailText = emailText + productRowText + " <br> "
      
      const orderResult = await db.query(
        `
            INSERT INTO order_detail (order_id, product_id, quantity) 
            VALUES ($1, $2, $3)
          `,
        [order[0].orderId, productId, quantity]
      );
    }

    // get orderID
    const orderID = order[0].orderId
    //console.log(orderID)
    //console.log(orderID.productId)

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log(process.env.SENDGRID_API_KEY)
    // console.log(typeof(totalCost))
    const msg = {
      "personalizations":[
         {
            "to":[
               {
                  "email": user.email //user.email //change to current customer email
               }
            ],
            "dynamic_template_data":{
               "body": emailText,
               "total" : String(totalCost)
            }
         }
      ],
      "from":{
         "email":"kordellschrock@gmail.com",
         "name":"Simply Pizza."
      },
      "reply_to":{
         "email":"kordellschrock@gmail.com",
         "name":"Simply Pizza."
      },
      "template_id":"d-c447ae34e5de4e368bf642a19d5d994e"
   };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    return await Order.fetchOrderDetailById(orderID);
  }
}

module.exports = Order;
