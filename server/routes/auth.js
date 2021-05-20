const router = require('express').Router()
const authController = require('../controllers/auth')

router.route('/user/register').post(authController.register)
router.route('/user/login').post(authController.login)
router.route('/user/logout').get(authController.logout)
router.route('/user/token').get(authController.getToken)

module.exports = router
