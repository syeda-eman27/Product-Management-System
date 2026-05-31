const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    let token = null;

    // Header se token lo
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    // Cookie fallback
    if (!token && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWTSecret
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;