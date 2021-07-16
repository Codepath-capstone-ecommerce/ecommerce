const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Products {
    // loook into joing orders with order_details
    static async listCurrentProducts() {
        const query = `
          SELECT products.name AS "name",
                 products.image_url AS "image",
                 products.price AS "price",
                 products.calories AS "cals"
          FROM products
        `
        const result = await db.query(query)
        return result.rows
    }

    static async createProduct({ product }) {
        // create a new order
        const productResult = await db.query(
            `
          INSERT INTO products(name, image_url,price, calories,description) 
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id,name, category,image_url,calories,price,description
        `,
            [product.name, product.image_url, product.price, product.calories, product.description]
        )

        // get orderId
        const productId = productResult.rows[0].id

        return await Products.fetchProductById(productId)
    }


    static async fetchProductById(productId) {
        const result = await db.query(
        `
        SELECT products.name AS "name",
               products.image_url AS "image",
               products.price AS "price",
               products.calories AS "cals"
        FROM products
        WHERE products.id = $1
        `,
            [productId]
        )

        return result.rows
    }
}

module.exports = Products
