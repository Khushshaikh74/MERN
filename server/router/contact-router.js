import express from 'express'
import contactForm from '../controllers/contact-controller.js'
import validate from '../middleware/validate-middleware.js'
import contactSchema from '../validators/contact-validator.js'

const router = express.Router()

router.route("/contact").post(validate(contactSchema) ,contactForm)

export default router;