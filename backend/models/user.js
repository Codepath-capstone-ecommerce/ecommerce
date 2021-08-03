const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name:user.last_name,
      rewards:user.rewards,
      email: user.email,
      isAdmin: user.is_admin,
      address:user.address
    }
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

  static async register(credentials) {
    const requiredFields = ["email", "password", "first_name", "last_name"]
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }
    })

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.")
    }

    const existingUser = await User.fetchUserByEmail(credentials.email)
    if (existingUser) {
      throw new BadRequestError(`A user already exists with email: ${credentials.email}`)
    }

    const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = credentials.email.toLowerCase()

    console.log(credentials.hasOwnProperty("address"))
    const userResult = await db.query(
      `INSERT INTO users (password, email, first_name, last_name, is_admin,address)
       VALUES ($1, $2, $3, $4, $5,$6)
       RETURNING id, email, first_name, is_admin, created_at;
      `,
      [ hashedPassword, normalizedEmail, credentials.first_name, credentials.last_name, credentials.is_admin,credentials.address]
    )
    const user = userResult.rows[0]

    return User.makePublicUser(user)
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

  static async updateUsersAddress({user, address}) {
    if (!user) {
      throw new BadRequestError("No user provided")
    }
    const requiredFields = ["address"]
    requiredFields.forEach(field =>{
      if(!address.hasOwnProperty(field)){
          throw new BadRequestError(`Required field - ${field} - missing from request body.`)
      }
  })
    const query = `
    UPDATE users
    SET address = $1
    WHERE email = $2`

    const result = await db.query(query, [address.address, user.email.toLowerCase()])
     
    return address.address + ": address has been updated!"
  }

  static async getRewardPoints({user}) {
    if (!user) {
      throw new BadRequestError("No user provided")
    }
    const query = `
    SELECT (users.rewards)
    FROM users
    WHERE users.email = $1`

    const result = await db.query(query, [user.email.toLowerCase()])
     
    return result.rows[0] 
  }

  static async addRewardPoints({user, pizzasPurchased}) {
    if (!user) {
      throw new BadRequestError("No user provided")
    }
    
    const query = `
    UPDATE users
    SET rewards = rewards + $1
    WHERE email = $2`

    const result = await db.query(query, [pizzasPurchased.pizzasPurchased, user.email.toLowerCase()])
    //const newTotal = await User.getRewardPoints({user})
    // var obj = JSON.parse(newTotal.rewards);
    // return obj.rewards + "hello"
    return "Successfully Added: " + pizzasPurchased.pizzasPurchased 
  }

  static async removeRewardPoints({user, pointsRedeemed}) {
    if (!user) {
      throw new BadRequestError("No user provided")
    }
    
    const query = `
    UPDATE users
    SET rewards = rewards - $1
    WHERE email = $2 AND rewards >= $1`

    const result = await db.query(query, [pointsRedeemed.pointsRedeemed, user.email.toLowerCase()])
    
    if(result.rowCount === 0){
      return "Not Enough Points"
    }
    return "Successfully removed: " + pointsRedeemed.pointsRedeemed 
  }

  static async listOrdersForUser(user) {
    const query = `
      SELECT orders.id AS "orderId",
          orders.completed AS "completed",
          orders.placed_at AS "placed_at",
          orders.delivery_address AS "delivery_address"
      FROM orders
        JOIN users ON users.id = orders.customer_id
      WHERE orders.customer_id = (SELECT id FROM users WHERE email = $1)
    `
    const result = await db.query(query, [user.email])

    return result.rows
  }

  static async createOrder({ order, user }) {
    if (!user) {
      throw new BadRequestError("No user provided")
    }
    const requiredFields = ["name", "category", "quantity", "calories", "image_url"]
    requiredFields.forEach(field =>{
        if(!nutrition.hasOwnProperty(field)){
            throw new BadRequestError(`Required field - ${field} - missing from request body.`)
        }
    })

    // create a new nutrition to user

    // id          SERIAL PRIMARY KEY,
    // name        TEXT NOT NULL,
    // category    TEXT,
    // quantity    INTEGER,
    // calories    INTEGER,
    // image_url   TEXT,
    // user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    // timestamp  TIMESTAMP NOT NULL DEFAULT NOW()

    const orderResult = await db.query(
      `
      INSERT INTO nutrition (name, category, quantity, calories, image_url, user_id) 
      VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
      RETURNING id,
                name,
                category,
                quantity,
                calories,
                image_url,
                timestamp AS "updatedAt"
    `,
    [nutrition.name, nutrition.category, nutrition.quantity, nutrition.calories, nutrition.image_url, user.email]
    )
    // get nutritionId
    const nutritionId = orderResult.rows[0].id

    return await Nutrition.fetchNutritionById(nutritionId)
  }
}

module.exports = User
