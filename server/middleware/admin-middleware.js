const adminMiddleware = async (req, res, next) => {
    try {
        const isAdmin = req.user?.isAdmin; // optional chaining for safety

        if (!isAdmin) {
            return res.status(403).json({ message: "Request denied. Not an admin" });
        }

        next(); // only call next() if admin
    } catch (error) {
        next(error);
    }
};

export default adminMiddleware;
