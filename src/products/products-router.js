const express = require('express')
const ProductsService = require('./products-service')
const path = require('path')
const xss = require('xss')

const productsRouter = express.Router()
const jsonBodyParser = express.json()

const serializeProducts = products => ({
    id: products.id,
    title: xss(products.title),
    description: xss(products.description),
    images: products.images,
}) 

const serializeReviews = reviews => ({
    reviews_id: reviews.reviews_id,
    ratings: reviews.ratings,
    reviews: xss(reviews.reviews),
    users_id: reviews.users_id,
    products_id: reviews.products_id,
})

const serializeProductsReviews = productsReviews => ({
    id: productsReviews.id,
    title: xss(productsReviews.title),
    description: xss(productsReviews.description),
    images: productsReviews.images, 
    ratings: productsReviews.ratings,
    reviews: xss(productsReviews.reviews),
})



productsRouter
    .route('/')
    .get((req, res, next) => {
        ProductsService.getAllProductsReviews(req.app.get('db'))
        .then(products => {
            res.json(products.map(serializeProductsReviews))
        })
        .catch(next)
    })

    productsRouter
    .route('/userhomepage')
    .get((req, res, next) => {
        ProductsService.getAllProductsReviews(req.app.get('db'))
        .then(products => {
            res.json(products.map(serializeProductsReviews))
        })
        .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
        const {reviews_id, ratings, reviews, users_id, products_id } = req.body
        const newReview = { reviews_id, ratings, reviews, users_id, products_id }

        for (const [key, value] of Object.entries(newReview))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
        ProductsService.insertReview(
            req.app.get('db'),
            newReview
        )
        .then(review => {
            res.status(201)
            .location(path.posix.join(req.originalUrl))
            .json(serializeReviews(review))
        })
        .catch(next)
    })

    productsRouter
    .route('/adminhomepage')
    .get((req, res, next) => {
        ProductsService.getAllProducts(req.app.get('db'))
        .then(products => {
            res.json(products.map(serializeProducts))
        })
        .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
        const { id, title, description, images } = req.body
        const newProduct = { id, title, description, images }

        for (const [key, value] of Object.entries(newProduct))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
        ProductsService.insertProduct(
            req.app.get('db'),
            newProduct
        )
        .then(product => {
            res.status(201)
            .location(path.posix.join(req.originalUrl))
            .json(serializeProducts(product))
        })
        .catch(next)
    })

module.exports = productsRouter