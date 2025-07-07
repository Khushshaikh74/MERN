import User from '../models/user-models.js'

const home = async (req, res) => {
    try {
        res.status(200).send("<h1>Mern Project</h1>")
    } catch (error) {
        console.error(error)
    }
}


/* -------------------------------------------------------------------- */
/*                           Registeration Logic                        */
/* -------------------------------------------------------------------- */
const register = async (req, res) => {
    try {
        // console.log(req.body);

        const { username, email, phone, password } = req.body;

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists. Try to login" });
        }

        // Create new user
        const user = await User.create({ username, email, phone, password });

        // Success response
        res
            .status(201)
            .json({
                msg: "User registered successfully",
                token: await user.generateToken(),
                userId: user._id.toString()
            });

    } catch (error) {
        //console.error("Error during registration:", error);
        //res.status(500).json({ msg: "Internal Server Error" });
        next(error)
    }
};


/* -------------------------------------------------------------------- */
/*                            Login Logic                               */
/* -------------------------------------------------------------------- */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email }); // returns a single user object

        if (!userExist) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await userExist.comparePassword(password); // must await

        if (isPasswordValid) {
            const token = await userExist.generateToken(); // call on valid document instance

            return res.status(200).json({
                message: "User login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            });
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        // console.error("Error during login:", error);
        // res.status(500).json({ msg: "Internal Server Error" });
        next(error)
    }
};

/* -------------------------------------------------------------------- */
/*           To send user data - user logic                             */
/* -------------------------------------------------------------------- */
const user = async (req, res) => {
    try {
        const userData = req.user
        res.status(200).json({ userData })
    } catch (error) {
        console.error("User Route Error: ", error)
    }
}

export default { home, register, login, user } 
