import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhaar,
    role
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !aadhaar ||
    !role
  ) {
    return next(new ErrorHandler("please fill full form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists!", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhaar,
    role
  });
  res.status(200).json({
    success: true,
    message: "user Registered!",
  });
});

export const login = catchAsyncErrors(async (req,res,next) => {
    const {email , password , confirmPassword, role}=req.body;//role is a static value we will send directly from frontend
    if(!email || !password || !confirmPassword || !role){
    return next(new ErrorHandler("please provide all details!", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("password and confirmPassword does not match!", 400));

    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email!", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password Or Email! ", 400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User With This Role Not Found",400));
    }
    res.status(200).json({
        success: true,
        message: "user Logged In Sucessfully!",
      });
});