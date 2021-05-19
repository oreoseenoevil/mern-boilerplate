const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { production } = require('../config/keys')

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

      const accessToken = createAccessToken({ id: user._id })
      const refreshToken = createRefreshToken({ id: user._id })

      res.cookie('mern_token', refreshToken, {
        httpOnly: true,
        path: '/api/user/refresh_token',
        maxAge: 7*24*60*60*100,
        secure: production
      })

      return res.status(201).json({
        success: true,
        data: {
          username: user.username,
          email: user.email,
        },
        access_token: accessToken,
        refresh_token: refreshToken
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
  refreshToken: async (req, res) => {
    try {
      const rfToken = req.cookies.mern_token
      if (!rfToken) {
        return res.status(403).json({
          success: false,
          error: 'Please signin or register.'
        })
      }

      jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({
            success: false,
            error: 'Please signin or register.'
          })
        }

        const accessToken = createAccessToken({ id: user.id })

        return res.status(201).json({
          success: true,
          data: user,
          access_token: accessToken
        })
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(403).json({
          success: false,
          error: 'User does not exist.'
        })
      }

      const accesstoken = createAccessToken({ id: user._id })
      const refreshtoken = createRefreshToken({ id: user._id })

      res.cookie('mern_token', refreshtoken, {
        httpOnly: true,
        path: '/api/user/refresh_token',
        maxAge: 7*24*60*60*100
      })

      if (user && (await user.matchPassword(password))) {
        return res.status(201).json({
          success: true,
          data: {
            role: user.role,
            username: user.username,
            email: user.email
          },
          access_token: accesstoken,
          refresh_token: refreshtoken
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
      res.clearCookie('mern_token', {
        path: '/api/user/refresh_token'
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

const createAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m'})
}

const createRefreshToken = user => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = authController
