const express = require('express')
const ProductsService = require('./products-service')
const path = require('path')
const xss = require('xss')
const { requireAuth } = require('../middleware/jwt-auth')

const productsRouter = express.Router()
const jsonBodyParser = express.json()

const serializeProducts = products => ({
    id: products.id,
    title: xss(products.title),
    description: xss(products.description),
    images: products.images,
}) 

const serializeReviews = reviews => ({
    ratings: reviews.ratings,
    reviews: xss(reviews.reviews),
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
    .get(requireAuth, (req, res, next) => {
        ProductsService.getAllProductsReviews(req.app.get('db'))
        .then(products => {
            res.json(products.map(serializeProductsReviews))
        })
        .catch(next)
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const { ratings, reviews } = req.body
        const newReview = { ratings, reviews }

        for (const [key, value] of Object.entries(newReview))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
        newReview.users_id = req.user.users_id

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
    .get(requireAuth, (req, res, next) => {
        if (req.user.username == 'acevedla5') {
            ProductsService.getAllProducts(req.app.get('db'))
            .then(products => {
                res.json(products.map(serializeProducts))
            })
            .catch(next)
        }
        else {
            res.status(404).json({
                message: "You are not allowed to be here"
            })
        }
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        if (req.user.username == 'acevedla5') {
            const {title, description, images } = req.body
            const newProduct = {title, description, images }

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
        }
        else {
            res.status(404).json({
                message: "You are not allowed to be here"
            })
        }
    })
    .patch(requireAuth, jsonBodyParser, (req, res, next) => {
        if (req.user.username == 'acevedla5') {
            const {title, description, images } = req.body
            const updateProduct = {title, description, images }

            for (const [key, value] of Object.entries(updateProduct))
                if (value == null)
                    return res.status(400).json({
                        error: `Missing '${key}' in request body`
                    })
            
            ProductsService.updateProduct(
                req.app.get('db'),
                id,
                updateProduct
            )
            .then(product => {
                res.status(201)
                .location(path.posix.join(req.originalUrl))
                .json(serializeProducts(product))
            })
            .catch(next)
        }
        else {
            res.status(404).json({
                message: "You are not allowed to be here"
            })
        }
    })
    .delete(requireAuth, (req, res, next) => {
        if (req.user.username == 'acevedla5') {
            ProductsService.deleteProduct(
                req.app.get('db'),
                id
            )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
        }
        else {
            res.status(404).json({
                message: "You are not allowed to be here"
            })
        }
    })
    

module.exports = productsRouter