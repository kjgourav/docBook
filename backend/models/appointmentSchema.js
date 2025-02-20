import mongoose, { mongo } from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "First Name Must Cotain At Least 3 Characters!"]
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "Last Name Must Cotain At Least 3 Characters!"]
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide A Valid Email!"]
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, "Phone Number Must Contain 10 Digits!"],
    maxlength: [11, "Phone Number Must Not Contain More Than 11 Digits!"]
  },
  aadhaar: {
    type: String,
    required: true,
    minlength: [12, "Aadhaar Number Must Contain Exact 12 Digits!"],
    maxlength: [12, "Aadhaar Number Must Contain Exact 12 Digits!"]
  },
  dob: {
    type: Date,
    required: [true, "DOB is required!"]
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
  },
  appointment_Date: {
    type:String,
    required: true,

  },
  department:{
    type:String,
    required:true,
  },
  doctor:{
    firstName:{
      type:String,
      required:true,
    },
    lastName:{
        type:String,
        required:true,
    }
  },
  hasVisited:{
    type:Boolean,
    default:false,
  },
  doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true,
  },
  patientId:{
    type:mongoose.Schema.ObjectId,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:["Pending","Accepted","Rejected"],
    default:"Pending",
  },
});

export const Appointment = mongoose.model("Appointment",appointmentSchema);
