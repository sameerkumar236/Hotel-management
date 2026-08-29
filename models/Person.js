import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
         type:String,
         required:true
    },
    username:{
         type:String,
         required:true
    },
    email:{
         type:String,
        required:true
    },
    work:{
         type:String,
         required:true
    }
})

personSchema.pre("save",async function(){
     const person = this;
       try {
           if (!this.isModified("password")) {
        return;
    }
         const hashedpassword =  await bcrypt.hash(person.password,10)
         person.password = hashedpassword;
       } catch (error) {
          console.log(error)
       }
})

const Person = mongoose.model("user",personSchema);
export default Person;