import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  createdBy: {
    type: String,
  },
  recipient: {
    type: String,
  },
  meetingLink: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const AcceptedAppointment = mongoose.model(
  "AcceptedAppointment",
  appointmentSchema
);
export default AcceptedAppointment;
