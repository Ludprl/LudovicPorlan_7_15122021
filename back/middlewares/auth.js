const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "403: utilisateur non authentifié";
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
        console.log("userToken Token Expire");
    }
};
