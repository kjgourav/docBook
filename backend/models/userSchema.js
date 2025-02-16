import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    required: true,
    select: false //when credentials are called or get by user password automatically should ot be included so we use select false
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"]
  },
  doctorDepartment: {
    type: String
  },
  docAvatar: {
    public_id: String,
    url: String
  }
});

//create methods to crypt password after being registered or to update the password
//when new user registers ie userschema will save and when his password comes and then this will bcrypt it and it will be saved in hash values
//when user updates his password it will be hashed again and saved in hash values
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//now the password that you login and the hash passowrd saved here we need a method
//to compare both passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//user login token generate
userSchema.methods.generateJsonWebToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
