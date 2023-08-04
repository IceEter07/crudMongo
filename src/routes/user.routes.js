const { Router } = require('express')
const router = Router()

const usersController = require('../controllers/users.controller')

router.get('/user/signup', usersController.renderSignUpForm)
router.post('/user/signup', usersController.signUp)

router.get('/user/signin', usersController.renderSignInForm)
router.post('/user/signin', usersController.signIn)

router.get('/user/logout', usersController.logout)


module.exports = router;