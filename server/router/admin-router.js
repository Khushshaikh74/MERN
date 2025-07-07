import express from 'express'
import adminController from '../controllers/admin-controller.js'
import userMiddleware from '../middleware/userMiddleware.js'
import adminMiddleware from '../middleware/admin-middleware.js'

const router = express.Router()

router.route('/users').get(userMiddleware, adminMiddleware, adminController.getAllUser)
router.route('/contacts').get(userMiddleware, adminMiddleware, adminController.getAllContact)
router.route('/user/delete/:id').delete(userMiddleware, adminMiddleware, adminController.deleteUser)
router.route('/contact/delete/:id').delete(userMiddleware, adminMiddleware, adminController.deleteContact)
router.route('/users/:id').get(userMiddleware, adminMiddleware, adminController.getUserById)
router.route('/users/update/:id').patch(userMiddleware, adminMiddleware, adminController.updateUser)

export default router;