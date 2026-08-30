import express from "express";
import Person from "../models/Person.js";

const router = express.Router();


/**
 * @swagger
 * /person/:
 *   post:
 *     summary: Create a new person
 *     tags:
 *       - Person
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - username
 *               - work
 *             properties:
 *               name:
 *                 type: string
 *                 example: String
 *               email:
 *                 type: string
 *                 example: String
 *               password:
 *                 type: string
 *                 example: String
 *               username:
 *                 type: string
 *                 example: String
 *               work:
 *                 type: string
 *                 example: String
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
    try {
        const data = req.body;

        const storedata = new Person(data);

        const createuser = await storedata.save();
        
         const user = createuser.toObject();
         delete user.password;

        res.status(200).json(user);

        console.log("user created");

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


/**
 * @swagger
 * /person/:
 *   get:
 *     summary: Get all persons
 *     description: Retrieve all persons from the database
 *     tags:
 *       - Person
 *     responses:
 *       200:
 *         description: Successfully retrieved all persons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 64f123abc456def789
 *                   name:
 *                     type: string
 *                     example: Sameer
 *                   email:
 *                     type: string
 *                     example: sameer@gmail.com
 *                   username:
 *                     type: string
 *                     example: sam
 *                   work:
 *                     type: string
 *                     example: Hacker
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
    try {
        const getdata = await Person.find();

        res.status(200).json(getdata);

        console.log("get user");

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


/**
 * @swagger
 * /person/{id}:
 *   put:
 *     summary: Update a person
 *     description: Update an existing person using their ID
 *     tags:
 *       - Person
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the person
 *         schema:
 *           type: string
 *         example: 64f123abc456def789
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sameer
 *               email:
 *                 type: string
 *                 example: sameer@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               username:
 *                 type: string
 *                 example: sam
 *               work:
 *                 type: string
 *                 example: Hacker
 *
 *     responses:
 *       200:
 *         description: Person updated successfully
 *       404:
 *         description: Person not found
 *       500:
 *         description: Server error
 */
router.put("/:id", async (req, res) => {
    try {
        const userid = req.params.id;
        const getdata = req.body;

        const updateddata = await Person.findByIdAndUpdate(
            userid,
            getdata,
            { new: true }
        );

        res.status(200).json(updateddata);

        console.log("Data updated");

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


/**
 * @swagger
 * /person/{id}:
 *   delete:
 *     summary: Delete a person
 *     description: Delete an existing person using their ID
 *     tags:
 *       - Person
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the person to delete
 *         schema:
 *           type: string
 *         example: 64f123abc456def789
 *
 *     responses:
 *       200:
 *         description: Person deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64f123abc456def789
 *                 name:
 *                   type: string
 *                   example: Sameer
 *                 email:
 *                   type: string
 *                   example: sameer@gmail.com
 *                 username:
 *                   type: string
 *                   example: sam
 *                 work:
 *                   type: string
 *                   example: Hacker
 *       404:
 *         description: Person not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", async (req, res) => {
    try {
        const userid = req.params.id;

        const deleteuser = await Person.findByIdAndDelete(userid);

        res.status(200).json(deleteuser);

        console.log("user deleted");

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

/**
 * @swagger
 * /person/:
 *   delete:
 *     summary: Delete all persons
 *     description: Delete all persons from the database
 *     tags:
 *       - Person
 *     responses:
 *       200:
 *         description: All persons deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All users deleted successfully
 *                 deletedCount:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Server error
 */
router.delete("/", async (req, res) => {
    try {
        const result = await Person.deleteMany({});

        res.status(200).json({
            message: "All users deleted successfully",
            deletedCount: result.deletedCount
        });

        console.log("All users deleted");

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


export default router;