const express = require("express")
const User = require("../models/user")
const security = require("../middleware/security")
const router = express.Router()

router.put("/updateAddress", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const address = await User.updateUsersAddress({user, address: req.body})
      return res.status(200).json({ address })
    } catch (err) {
      next(err)
    }
  })

  router.get("/getRewards", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const rewards = await User.getRewardPoints({user})
      return res.status(200).json({ rewards })
    } catch (err) {
      next(err)
    }
  })

  router.get("/getOrders", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const rewards = await User.listOrdersForUser({user})
      return res.status(200).json({ rewards })
    } catch (err) {
      next(err)
    }
  })

  router.put("/addRewards", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const rewards = await User.addRewardPoints({user, pizzasPurchased: req.body})
      return res.status(200).json({ rewards })
    } catch (err) {
      next(err)
    }
  })

  router.put("/redeemRewards", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const rewards = await User.removeRewardPoints({user, pointsRedeemed: req.body})
      return res.status(200).json({ rewards })
    } catch (err) {
      next(err)
    }
  })


  module.exports = router