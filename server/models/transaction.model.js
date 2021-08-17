import mongoose from 'mongoose'
import crypto from 'crypto'
import ProductSchema from './product.model.js'

const TransactionSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    required: 'No user'
  },
  products: [ProductSchema],
  type: { //in smokapp key is phone
    type: String,
    enum: ['sale', 'deposit', 'buy'],
    required: 'Type of transaction'
  },
  amount: {
    type: Number,
    min: [0, 'Not enough Product'],
    required: 'Amount is required'
  },
})

TransactionSchema.methods = {
  buy: function() {
    console.log('buy method');
    return 0
  },
  sale: function() {
    console.log('sale method');
    return 0
  },
  deposit: function() {
    console.log('deposit method');
    return 0
  },
  getMerme: function() {
    console.log('getMerme method');
    return 0
  }
}

export default mongoose.model('Transaction', TransactionSchema)
