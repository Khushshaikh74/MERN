import Contact from "../models/contact-model.js";

const contactForm = async (req, res) => {
    try {
        const response = req.body
        await Contact.create(response);
        return res.status(200).json({ message: "Contact form submitted successfully"})
    } catch (error) {
        next(error)
    }
}

export default contactForm;