// Schema para realizar el modelo

import mongoose from "mongoose";
const {Schema,model} = mongoose;

const userSchema = new Schema({

    name :{
        type:String,
        require:[true,"El campo nombre es obligatorio "]
    },
    lastname :{
        type:String,
        require:[true,"El campo lastname es obligatorio "]
    },
    email :{
        type:String,
        require:[true,"El campo Email es obligatorio "],
        unique:true

    },
    password :{
        type: String,
        require:[true,"El campo Password es obligatorio "]
    },
},{ timestamps:true})


export const userModel = model("user",userSchema)