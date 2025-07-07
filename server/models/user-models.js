import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

/* -------------------------------------------------------------------- */
/*                            User Schema                               */
/* -------------------------------------------------------------------- */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

/* -------------------------------------------------------------------- */
/*                   Securing password using bcrypt                     */
/* -------------------------------------------------------------------- */
userSchema.pre("save", async function (next) {
    try {
        const user = this;

        // Only hash the password if it has been modified (or is new)
        if (!user.isModified("password")) return next();

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;

        next();
    } catch (error) {
        next(error);
    }
});

/* -------------------------------------------------------------------- */
/*                       Compare password                               */
/* -------------------------------------------------------------------- */
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password)
}

/* -------------------------------------------------------------------- */
/*                         Json web Token                               */
/* -------------------------------------------------------------------- */
userSchema.methods.generateToken = async function(){
    try {
        const user = this;
        const token = jwt.sign(
            { _id: user._id, email : user.email, isAdmin : user.isAdmin}, // you can include more fields if needed
            process.env.JWT_SECRET, // store your secret in .env
            { expiresIn: '7d' } // token expiry
        );
        return token;
    } catch (error) {
        console.error("Token generation error:", error);
        throw error;
    }
}


/* -------------------------------------------------------------------- */
/*                  model creater for registeration                     */
/* -------------------------------------------------------------------- */
const User = new mongoose.model('User', userSchema);  //User is collection and schema

export default User;