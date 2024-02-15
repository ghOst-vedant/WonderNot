import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
