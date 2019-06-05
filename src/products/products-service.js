const xss = require('xss')

const ProductsService = {
    getAllProducts(knex) {
        return knex
        .select('*')
        .from('products, reviews')
        .where('id' = 'products_id')
    },
}

module.exports = ProductsService