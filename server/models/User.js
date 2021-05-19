const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add your username.'],
    minLength: [3, 'Minimum at least 3 characters.'],
    maxLength: [20, 'Maximum at least 20 characters.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please add your email.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add your password.'],
    minLength: [6, 'Minimum at least 6 characters.']
  },
  role: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', UserSchema)
