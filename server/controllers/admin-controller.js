import User from '../models/user-models.js';
import Contact from '../models/contact-model.js';

/* -------------------------------------------------------------------- */
/*                             All users                                */
/* -------------------------------------------------------------------- */
const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({ users }); // Don't use `message` for actual data
    } catch (error) {
        next(error); // make sure `next` is defined in parameters
    }
};

/* -------------------------------------------------------------------- */
/*                           All contacts                               */
/* -------------------------------------------------------------------- */
const getAllContact = async(req, res, next)=>{
    try {
        const contacts = await Contact.find()

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({contacts})
    } catch (error) {
        next()
    }
}

/* -------------------------------------------------------------------- */
/*                       Delete User Logic                              */
/* -------------------------------------------------------------------- */
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `No user found with ID ${id}` });
        }

        res.status(200).json({ message: `User with ID ${id} successfully deleted` });
    } catch (error) {
        next(error);
    }
};

/* -------------------------------------------------------------------- */
/*                       Delete User Logic                              */
/* -------------------------------------------------------------------- */
const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Optional: Check if contact exists first
    const contactExists = await Contact.findById(id);
    if (!contactExists) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Delete the contact
    await Contact.deleteOne({ _id: id });

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error); // Pass to centralized error handler
  }
};


/* -------------------------------------------------------------------- */
/*                   Get Single User Logic                              */
/* -------------------------------------------------------------------- */
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id }, { password: 0 });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user }); // ✅ fixed line
    } catch (error) {
        next(error);
    }
};

/* -------------------------------------------------------------------- */
/*                       Update User Logic                              */
/* -------------------------------------------------------------------- */
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, projection: { password: 0 } } // returns the updated doc, without password
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        next(error);
    }
};


export default {getAllUser, getAllContact, deleteUser, getUserById, updateUser, deleteContact};
