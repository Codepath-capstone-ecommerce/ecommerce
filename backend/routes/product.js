const express = require("express")
const Products = require("../models/products")
const router = express.Router()

/**
 * This first runs the requireAuthenticatedUser function to verify user
 * Then runs the route handler logic below
 */
router.get("/list", async (req, res, next) => {
  try {
    const products = await Products.listCurrentProducts()
    //const orders = await Order.listOrdersForUser(user)
    //return res.status(200).json({ publicUser, orders })
    return res.status(200).json({products})
  } catch (err) {
    next(err)
  }
})

router.post("/create", async (req, res, next) => {
    try {
      const product = req.body
      const newProduct = await Products.createProduct(product)
      return res.status(200).json({ newProduct })
    } catch (err) {
      next(err)
    }
  })


  router.get("/byName", async (req, res, next) => {
    try {
      const productResponse = await Products.fetchProductByName({productName:req.body})
      return res.status(200).json({ productResponse })
    } catch (err) {
      next(err)
    }
  })

  module.exports = router