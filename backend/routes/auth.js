const express = require("express")
const User = require("../models/user")
const { createUserJwt } = require("../utils/tokens")
const security = require("../middleware/security")
const router = express.Router()

/**
 * This first runs the requireAuthenticatedUser function to verify user
 * Then runs the route handler logic below
 */
router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user
    const user = await User.fetchUserByEmail(email)
    const publicUser = User.makePublicUser(user)
    //const orders = await Order.listOrdersForUser(user)
    //return res.status(200).json({ publicUser, orders })
    return res.status(200).json({ publicUser })
  } catch (err) {
    next(err)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body)
    const token = createUserJwt(user)
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async (req, res, next) => {
  try {
    const admin = req.body.isAdmin?req.body.isAdmin:false
    const user = await User.register({ ...req.body, is_admin: admin })
    const token = createUserJwt(user)
    return res.status(201).json({ user, token })
  } catch (err) {
    next(err)
  }
})

module.exports = router
