const xss = require('xss')

const ProductsService = {
    getAllProducts(knex) {
        return knex
        .select('*')
        .from('products')
    },
    getAllProductsReviews(knex) {
        return knex
        .select('*')
        .from('products')
        .join('reviews', {'products.id': 'reviews.products_id'})
    },
    getProductById (knex, id) {
        return ProductsService.getAllProductsReviews(knex)
        .where('id', id)
        .first()
    },
    insertReview(knex, newReview) {
        return knex
        .insert(newReview)
        .into('reviews')
        .returning('*')
        .then(([review]) => review)
        .then(review =>
            ProductsService.getProductById(knex, review.reviews_id))
    },
    insertProduct (knex, newProduct) {
        return knex
        .insert(newProduct)
        .into('products')
        .returning('*')
        .then(([product]) => product)
        .then(product => 
            ProductsService.getAllProducts(knex, product.id))
    },
}

module.exports = ProductsService