const express = require("express")
const User = require("../models/user")
const Order = require("../models/order")
const security = require("../middleware/security")
const router = express.Router()

router.post("/create", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const cartResponse = await Order.createOrder({user, cart: req.body})
      const orderDetail = await Order.createOrderDetail({ order: cartResponse, user, cart: req.body})
      return res.status(200).json({ orderDetail: orderDetail })
    } catch (err) {
      next(err)
    }
  })

  router.get("/list", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const orders = await Order.listOrdersForUser({user})
      return res.status(200).json({ orders })
    } catch (err) {
      next(err)
    }
  })

 


  module.exports = router