const express = require('express')
const ProductsService = require('./products-service')
const path = require('path')
const xss = require('xss')

const productsRouter = express.Router()
const jsonParser = express.json()

const serializeProducts = products => ({
    id: products.id,
    title: xss(products.title),
    description: xss(products.description),
    ratings: products.ratings,
    reviews: xss(products.reviews),
})

productsRouter
    .route('/')
    .get((req, res, next) => {
        ProductsService.getAllProducts(req.app.get('db'))
        .then(products => {
            res.json(products.map(serializeProducts))
        })
        .catch(next)
    })

module.exports = productsRouter