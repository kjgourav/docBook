import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    aadhaar,
    dob,
    gender,
    appointment_Date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !aadhaar ||
    !dob ||
    !gender ||
    !appointment_Date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor Not Found!", 404));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email And Phone !",
        404
      )
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    aadhaar,
    dob,
    gender,
    appointment_Date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName
    },
    hasVisited,
    address,
    doctorId,
    patientId
  });
  res.status(200).json({
    success: true,
    message: "Appontment Sent Succesfully!",
    appointment
  });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});
