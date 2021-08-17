import express from 'express'
import productCtrl from '../controllers/product.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/products')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.create)

router.route('/api/products/:productId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.remove)

router.param('productId', productCtrls.productByID)

export default router
