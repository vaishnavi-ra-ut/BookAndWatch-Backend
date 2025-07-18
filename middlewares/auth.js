const jwt = require("jsonwebtoken");
const User = require("../models/User")
exports.requireAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        // console.log(token);
        if (!token) {
            return res.status(401).send("Please Login");
        }
        const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = decodedObj;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}
exports.requireRole = (role) => (req, res, next) => {
    if (req.user?.role !== role) {
        return res.status(403).json({ msg: 'Forbidden: Insufficient role' });
    }
    next();
};
