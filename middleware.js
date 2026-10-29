const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "claw-virtual-adoption",
      audience: "claw-virtual-adoption-api",
      algorithms: ["HS256"],
    });

    req.user = {
      id: payload.sub,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Session expired, please login again.",
      });
    }

    return res.status(401).json({
      message: "Invalid authentication.",
    });
  }
}

module.exports = authToken;