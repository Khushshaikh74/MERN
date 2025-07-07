import express from 'express'
import authController from '../controllers/auth-controller.js'
import {userSignUpSchema, userLoginSchema} from '../validators/auth-validators.js'
import validate from '../middleware/validate-middleware.js'
import userMiddlewate from '../middleware/userMiddleware.js'

const router = express.Router()

router.route("/").get(authController.home)
router.route("/register").post(validate(userSignUpSchema) ,authController.register)
router.route("/login").post(validate(userLoginSchema) ,authController.login)
router.route("/user").get(userMiddlewate, authController.user)

export default router;