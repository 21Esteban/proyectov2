import mongoose from "mongoose";



const { Schema, model } = mongoose;

const categorySchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "el name es obligatorio"],
      },
      description: {
        type: String,
        required: [true, "La description es obligatoria"],
      },
  
      imgUrl:{
        type:String,
        default:null,
      },
  
      // nameImage: String,
  
      public_id:String,
  
    },
    {
      timestamps: true,
    }
  );

  categorySchema.methods.setImg = function setImg({secure_url,public_id}){
    this.imgUrl = secure_url;
    this.nameImage= public_id;
  }





  export const categoryModel=model("category",categorySchema)

