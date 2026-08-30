import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({

  roomNumber: {
    type: String,
    required: true,
    unique: true
  },

  type: {
    type: String,
    enum: ["single", "double", "deluxe"],
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["available", "occupied"],
    default: "available"
  },

  image: {
  type: String,
  required: true
}
});

const Rooms = mongoose.model("room", RoomSchema);

export default Rooms;