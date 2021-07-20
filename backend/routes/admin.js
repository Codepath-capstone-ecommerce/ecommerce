const express = require("express")
const Admin = require("../models/admin")
const { createUserJwt } = require("../utils/tokens")
const security = require("../middleware/security")
const router = express.Router()


router.post("/weeklyorders", async (req, res, next) => {
  try {
    const orders = await Admin.grabWeeklyOrders(req.body)
    return res.status(200).json({ orders })
  } catch (err) {
    next(err)
  }
})

router.post("/weeklycustomers", async (req, res, next) => {
  try {
    const customers = await User.register({ ...req.body, is_admin: false })
    const token = createUserJwt(user)
    return res.status(201).json({ user, token })
  } catch (err) {
    next(err)
  }
})

module.exports = router
