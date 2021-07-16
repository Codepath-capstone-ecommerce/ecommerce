const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

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
          SELECT order_detail.id AS "order_detail_id",
                product_id.product_id AS "product_id",
                order_detail.quantity AS "quantity"
          FROM order_detail
          WHERE orders.id = $1
        `,
      [orderId]
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

    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      let productName = Object.keys(obj)[0]; //LOOKUP product name in products to get productID type Integer
      let quantity = Number(obj[productName]);
      productName = 1;
      
      const orderResult = await db.query(
        `
            INSERT INTO order_detail (order_id, product_id, quantity) 
            VALUES ($1, $2, $3)
                    RETURNING order_id,
                    product_id,
                    quantity,
                    created_at AS "created_at"
          `,
        [order[0].orderId, productName, quantity]
      );
      productName += 1;
    }

    // get orderID
    const orderID = orderResult.rows[0].order_id;

    return await Order.fetchOrderDetailById(orderID);
  }
}

module.exports = Order;
