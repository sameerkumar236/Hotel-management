import express from "express";
import passport from "../auth.js";

const router = express.Router();

const LocalAuthMiddleware = passport.authenticate("local", {
    session: false
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Login user using username and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: sameer
 *               password:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Incorrect username or password
 */

router.post("/", LocalAuthMiddleware, (req, res) => {
   try {
     res.status(200).json({
        message: "Login successful",
        user: req.user
    });
   } catch (error) {
          console.log(error)
   }
});
export default router;