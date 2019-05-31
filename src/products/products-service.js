const xss = require('xss')

const ProductsService = {
    getAllProducts(knex) {
        return knex
        .select('*')
        .from('products')
    },
}

module.exports = ProductsService