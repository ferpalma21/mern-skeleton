import mongoose from 'mongoose'
import crypto from 'crypto'

const PictureSchema = new mongoose.Schema({
  type: {
    type: String,
    required: 'Type of image required'
  },
  name: {
    type: String,
    required: 'Filename is required'
  },
})

PictureSchema.methods = {
}

export default mongoose.model('Picture', PictureSchema)
