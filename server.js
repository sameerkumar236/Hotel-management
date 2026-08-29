import express from "express";
import router from "./Routes/personRoutes.js"
import loginrouter from "./Routes/Login.js"
import swaggerUi from "swagger-ui-express";
import passport from "./auth.js";
import swaggerSpec from "./swagger.js";
import db from "./db.js"
const app = express();
const port = 5000;

app.use(express.json())
app.use(passport.initialize());

db();

app.get("/",(req,res)=>{
    res.send("It is working")
})


// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/person",router);
app.use("/login",loginrouter);


app.listen(port,(req,res)=>{
    console.log(`Server is running at ${port}`)
})