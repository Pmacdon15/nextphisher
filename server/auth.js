//MARK: Untested
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");

class AuthManager {
  constructor() {
    const envPath = path.resolve(__dirname, "./.env");
    dotenv.config({ path: envPath });
  }

  // createToken(email) {
  //   const secret_key = process.env.SECRET_KEY_JWT;
  //   const key = secret_key;
  //   const token = jwt.sign({ user: "admin" }, key);
  //   return token;
  // }

  confirmLogin(req, res, next) {
    const secret_key = process.env.SECRET_KEY_JWT;
    const key = secret_key;

    // Check if the request is for the favicon.ico file
    if (req.url === "/favicon.ico") {
      next(); // Skip token verification for favicon.ico
      return;
    }

    const cookieName = "AuthCookieTracking"; // Replace with the correct cookie name
    const token = req.cookies[cookieName];

    if (!token) {
      //res.status(401).json({ message: "Unauthorized" });
      console.log("Unauthorized");
    } else {
      jwt.verify(token, key, (err, user) => {
        if (err) {
          //res.status(401).json({ message: "Unauthorized" });
          console.log("Unauthorized");
        } else {
          //Decode token
          req.user = user;
          const decoded = jwt.verify(token.value, process.env.SECRET_KEY_JWT);
          if (decoded.user === "admin") {
            next();
          } else {
            console.log("Unauthorized");
          }         
        }
      });
    }
  }
}

module.exports = new AuthManager();
