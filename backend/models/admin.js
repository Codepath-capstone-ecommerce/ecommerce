const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Admin {
    // loook into joing orders with order_details
    static async listCurrentOrders() {
        const query = `
          SELECT order.id AS "orId",
                 order.customer_id AS "cusId",
                 order.delivery_address AS "addy"
          FROM orders
          WHERE orders.completed = True
        `
        const result = await db.query(query)
        return result.rows
      }

    //find some way to send start and end dates to this function
    static async grabWeeklyOrders(start_date,end_date) {
        //find way to group by each day of the week
        const query = `
            SELECT COUNT(*)
            FROM orders
            WHERE placed_at >= '{start_date}' 
            AND   placed_at <  '{end_date}'
            AND   orders.completed = True
            group by placed_at
        `
        const result = await db.query(query)
        return result.rows
    }

    static async grabWeeklyCustomer(start_date,end_date) {
        const query = `
          SELECT order.id AS "orId",
                 order.customer_id AS "cusId",
                 order.delivery_address AS "addy"
          FROM orders
          WHERE orders.completed = True
        `
        const result = await db.query(query)
        return result.rows
      }

  static async login(credentials) {
    const requiredFields = ["email", "password"]
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }
    })

    const user = await User.fetchUserByEmail(credentials.email)
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password)
      if (isValid) {
        return User.makePublicUser(user)
      }
    }

    throw new UnauthorizedError("Invalid username/password")
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided")
    }

    const query = `SELECT * FROM users WHERE email = $1`

    const result = await db.query(query, [email.toLowerCase()])

    const user = result.rows[0]

    return user
  }
}

module.exports = Admin
