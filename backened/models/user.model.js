import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    credits:{
        type:Number,
        default:100,
        min:0
    },
    isCreditAvailable:{
        type:Boolean,
        default:true
    },
    notes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Notes",
        default:[]

    }

},{timestamps:true})

// was: mongoose.model("UserModel", userSchema)
const UserModel = mongoose.model("User", userSchema)

export default UserModel