const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Products {
    // loook into joing orders with order_details
    static async listCurrentProducts() {
        const query = `
          SELECT products.id AS "productId",
                 products.name AS "name",
                 products.image_url AS "image",
                 products.price AS "price",
                 products.calories AS "cals"
          FROM products
        `
        const result = await db.query(query)
        return result.rows
    }

    static async fetchProductByCategory(productCat) {
        const result = await db.query(
        `
        SELECT products.name AS "name",
               products.image_url AS "image",
               products.price AS "price",
               products.calories AS "cals"
        FROM products
        WHERE products.category = $1
        `,
            [productCat]
        )

        return result.rows
    }

    static async createProduct(product) {
        // create a new order
        const productResult = await db.query(
            `
          INSERT INTO products(name, image_url,price, calories,description,category) 
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id,name, category,image_url,calories,price,description
        `,
            [product.name, product.image_url, product.price, product.calories, product.description, product.category]
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
               products.calories AS "cals",
               products.category AS "cat"
        FROM products
        WHERE products.id = $1
        `,
            [productId]
        )

        return result.rows
    }

    static async fetchProductByName(productName) {
        const result = await db.query(
        `
        SELECT products.id AS "productId",
               products.name AS "name",
               products.image_url AS "img",
               products.price AS "price"
        FROM products
        WHERE products.name LIKE $1
        `,
            [productName]
        )
    //    console.log(result.rows)

        return result.rows
    }
}

module.exports = Products
