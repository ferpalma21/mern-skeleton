import mongoose from 'mongoose'
import crypto from 'crypto'
const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user'
  },
  name: {
    type: String,
    trim: true,
    required: 'Name(s) is required'
  },
  surname: {
    type: String,
    trim: true,
    required: 'Surname(s) is required'
  },
  mobile: { //in smokapp key is phone
    type: String,
    trim: true,
    required: 'Mobile is required'
  },
  countryMobile: {
    type: String,
    trim: true,
    required: 'Lada country mobile is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  dniNumber: {
    type: String,
    trim: true,
    unique: 'DNI Number already exists',
    required: 'DNI Number is required'
  },
  dniType: {
    type: String,
    enum: ['national', 'passport'],
    required: 'DNI type is required'
  },
  dniFront: {
    type: String,
  },
  dniBack: {
    type: String,
  },
  birthday: {
    type: Date,
    required: 'Birthday is required'
  },
  hashedPassword: {
    type: String,
    required: "Password is required"
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('birthday', function (next){
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    Math.abs(ageDate.getUTCFullYear() - 1970);
    next();
})

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashedPassword').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserSchema)
