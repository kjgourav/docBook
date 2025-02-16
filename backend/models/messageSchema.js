import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minlength: [3,"First Name Must Cotain At Least 3 Characters!"]
    },
    lastName:{
        type:String,
        required: true,
        minlength: [3,"Last Name Must Cotain At Least 3 Characters!"]
    },
    email:{
        type:String,
        required: true,
        validate:[validator.isEmail,"Please Provide A Valid Email!"]
    },
    phone:{
        type:String,
        required: true,
        minlength: [10,"Phone Number Must Contain 10 Digits!"],
        maxlength: [11,"Phone Number Must Not Contain More Than 11 Digits!"],
    },
    message:{
        type:String,
        required: true,
        minlength: [10,"Message Must Cotain At Least 10 Characters!"],
    },
});


export const Message = mongoose.model("Message",messageSchema);