const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.is_admin,
      createdAt: user.created_at,
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

    const userResult = await db.query(
      `INSERT INTO users (password, email, first_name, last_name, is_admin)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, first_name, is_admin, created_at;
      `,
      [ hashedPassword, normalizedEmail, credentials.first_name, credentials.last_name, credentials.is_admin]
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

  static async listOrdersForUser(user) {
    const query = `
      SELECT excercises.id AS "excerciseId",
             excercises.name AS "name",
             excercises.category AS "category",
             excercises.duration AS "duration",
             excercises.intensity AS "intensity",
             excercises.timestamp AS "postedAt"
      FROM excercises
        JOIN users ON users.id = excercises.user_id
      WHERE excercises.user_id = (SELECT id FROM users WHERE email = $1)
    `
    const result = await db.query(query, [user.email])

    return result.rows
  }
}

module.exports = User
