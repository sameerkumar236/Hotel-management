import express from "express";
import Rooms from "../models/Rooms.js";

const router = express.Router();

/**
 * @swagger
 * /room:
 *   post:
 *     summary: Create a new room
 *     tags:
 *       - Rooms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomNumber
 *               - type
 *               - price
 *             properties:
 *               roomNumber:
 *                 type: string
 *                 example: "101"
 *
 *               type:
 *                 type: string
 *                 enum:
 *                   - single
 *                   - double
 *                   - deluxe
 *                 example: single
 *
 *               price:
 *                 type: number
 *                 example: 2000
 *
 *               status:
 *                 type: string
 *                 enum:
 *                   - available
 *                   - occupied
 *                 example: available
 *
 *               image:
 *                 type: string
 *                 example: "/uploads/room1.jpg"
 *
 *     responses:
 *       201:
 *         description: Room created successfully
 *
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const persondata = new Rooms(data);

    const savedrooms = await persondata.save();

    res.status(201).json(savedrooms);

    console.log("Rooms data saved");

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
});


/**
 * @swagger
 * /room:
 *   get:
 *     summary: Get all rooms
 *     tags:
 *       - Rooms
 *
 *     responses:
 *       200:
 *         description: Rooms fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "68b123456789"
 *
 *                   roomNumber:
 *                     type: string
 *                     example: "101"
 *
 *                   type:
 *                     type: string
 *                     enum:
 *                       - single
 *                       - double
 *                       - deluxe
 *                     example: single
 *
 *                   price:
 *                     type: number
 *                     example: 2000
 *
 *                   status:
 *                     type: string
 *                     enum:
 *                       - available
 *                       - occupied
 *                     example: available
 *
 *                   image:
 *                     type: string
 *                     example: "/uploads/room1.jpg"
 *
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const data = await Rooms.find();

    res.status(200).json(data);

    console.log("Get rooms data");

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
});


export default router;