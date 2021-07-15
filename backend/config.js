require("dotenv").config()
require("colors")

const SECRET_KEY = process.env.SECRET_KEY || "secret_dev"
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const IS_TESTING = process.env.NODE_ENV === "test"

function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres"
  const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
  const dbHost = process.env.DATABASE_HOST || "localhost"
  const dbPort = process.env.DATABASE_PORT || 5432
  const dbName = process.env.DATABASE_NAME || "pizza_shop"

  return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

const BCRYPT_WORK_FACTOR = 13

console.log("Pizza Shop Config:".red)
console.log("SECRET_KEY:".blue, SECRET_KEY)
console.log("PORT:".blue, PORT)
console.log("IS_TESTING:".blue, IS_TESTING)
console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR)
console.log("Database:".blue, getDatabaseUri())
console.log("---")

module.exports = {
  PORT,
  IS_TESTING,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
}
