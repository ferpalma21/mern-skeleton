import mongoose from 'mongoose'
import crypto from 'crypto'
import PictureSchema from './picture.model.js'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['flower', 'hash', 'edible', 'drink'],
    required: 'Type of product required'
  },
  type_of_measure: {
    type: String,
    enum: ['units', 'weight'],
    required: 'Type of measure required'
  },
  description: {
    type: String,
    trim: true
  },
  pictures: [PictureSchema],
  thc: {
    type: Number
  },
  amount: {
    type: Number,
    min: 0,
    required: 'Amount is required'
  },
})

ProductSchema.methods = {
  addProduct: function() {
    console.log('buying metod');
    return 0
  },
  removeProduct: function() {
    console.log('sale metod');
    return 0
  }
}

export default mongoose.model('Product', ProductSchema)
