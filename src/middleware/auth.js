import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      // IMPORTANT: Specify the algorithm to prevent "alg: none" attacks.
      algorithms: ["HS256"], 
    });

    req.user = payload;
    next();
  } catch (err) {
    // Provide more specific error messages if you want
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}