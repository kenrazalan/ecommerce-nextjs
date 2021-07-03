import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },role: {
        type: String,
        default: "user"
    },
    root: {
        type: Boolean,
        default: false,
    },
    avatar:{
        type: String,
        default: "https://st.depositphotos.com/2101611/3925/v/950/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"       
    }
},{
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('user',userSchema)

export default Dataset