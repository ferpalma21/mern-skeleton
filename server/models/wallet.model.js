import mongoose from 'mongoose'
import crypto from 'crypto'
const WalletSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    required: 'Name(s) is required'
  },
  amount: {
    type: Number,
    min: [0, 'Not enough money'],
    default: 0
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

WalletSchema.methods = {
  deposit: function({lastAmount, amount}) {
    return lastAmount + amount
  },
  buy: function() {
    return lastAmount - amount
  }
}

export default mongoose.model('Wallet', WalletSchema)
