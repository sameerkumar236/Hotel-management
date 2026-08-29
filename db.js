import mongoose from "mongoose";

const db = async()=>{
    try {
        const database = await mongoose.connect("mongodb+srv://sameersizoxta625_db_user:B5lWKNMHXbeItrfC@cluster0.b6tnxcv.mongodb.net/");
        console.log("mongoDB connected successfully!")
    } catch (error) {
        console.log("mongoDB connection failed",error);
    }
}

export default db;