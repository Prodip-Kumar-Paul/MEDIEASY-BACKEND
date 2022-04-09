import Jwt from "jsonwebtoken";
import config from "../config/config.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      const error = new Error("No authentication token attached");
      error.statusCode = 401;
      throw error;
    }
    const token = req.get("Authorization").split(" ")[1];
    console.log(token);
    const decoded = Jwt.verify(token, config.JWT_ACTIVATE);
    console.log(decoded);
    if (!decoded) {
      res.status(401).json({
        status: false,
        message: "Token expires",
        data: "",
      });
    }
    const { hospitalId } = decoded;
    req.hospitalId = hospitalId;

    next();
  } catch (err) {
    next(err);
  }
};

export const isAuthenticatedAndAdmin = async (req, res, next) => {
  try {
    const authToken = req.get("Authorization");

    if (!authToken) {
      const error = new Error("No authentication token attached");
      error.statusCode = 401;
      throw error;
    }

    const token = authToken.split(" ")[1];

    const { exp } = jwt.decode(token);
    if (Date.now() >= exp * 1000) {
      const error = new Error("Token Expired");
      error.statusCode = 401;
      throw error;
    }

    const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY);
    if (!decodedToken) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
    // console.log(decodedToken);
    if (decodedToken.userType !== "Admin") {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    req.userType = decodedToken.userType;
    req.githubToken = decodedToken.githubToken;
    next();
  } catch (err) {
    next(err);
  }
};
