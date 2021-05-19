const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { production, secretKey } = require('../config/keys')

const authController = {
  register: async (req, res) => {
    try {
      const { email, username } = req.body
      const emailExist = await User.findOne({ email })
      const userExist = await User.findOne({ username })

      if (emailExist) {
        return res.status(403).json({
          success: false,
          error: 'This email already in used.'
        })
      }
      if (userExist) {
        return res.status(403).json({
          success: false,
          error: 'This username already in used.'
        })
      }

      const user = await User.create(req.body)

      return res.status(201).json({
        success: true,
        data: {
          username: user.username,
          email: user.email,
        }
      })
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message)

        return res.status(400).json({
          success: false,
          error: messages
        })
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        })
      }
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(403).json({
          success: false,
          error: 'Email does not exist.'
        })
      }

      if (user && (await user.matchPassword(password))) {
        const payload = {
          id: user._id,
          name: user.username
        }

        jwt.sign(payload, secretKey, {
          expiresIn: 31556926
        }, (err, token) => {

          res.cookie('mern_session', token, {
            httpOnly: true,
            path: '/',
            maxAge: 7*24*60*60*100,
            secure: production,
            sameSite: true
          })

          res.cookie('dotcom_user', user.username, {
            httpOnly: true,
            path: '/',
            maxAge: 7*24*60*60*100,
            secure: production,
            sameSite: true
          })

          return res.status(201).json({
            success: true,
            data: `Bearer ${token}`
          })
        })

      } else {
        return res.status(403).json({
          success: false,
          error: 'Incorrect Password'
        })
      }

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('mern_session', {
        path: '/'
      })
      res.clearCookie('dotcom_user', {
        path: '/'
      })
  
      return res.status(200).json({
        success: true,
        message: 'Successfully logged out.'
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
}

module.exports = authController
