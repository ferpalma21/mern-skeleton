import Product from '../models/product.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

const create = async (req, res) => {
  const product = new Product(req.body)
  try {
    await product.save()
    return res.status(200).json({
      message: "Product Added"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load product and append to req.
 */

 const productFind = async (req, res, next, id) => {
  try {
    let products = await User.find(params)
    req.data = products
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve product"
    })
  }
}

const productByID = async (req, res, next, id) => {
  try {
    let product = await User.findById(id)
    if (!product)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = product
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve product"
    })
  }
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const list = async (req, res) => {
  console.log('asdasd');
  try {
    let products = await User.find().select('name images')
    res.json(products)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let product = req.data
    product = extend(product, req.body)
    product.updated = Date.now()
    await product.save()
    res.json(product)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let product = req.data
    let deletedProduct = await product.remove()
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  productFind,
  productByID,
  read,
  list,
  remove,
  update
}
