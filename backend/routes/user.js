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


  module.exports = router