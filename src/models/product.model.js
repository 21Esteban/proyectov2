import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema(
    {
        name: {
          type: String,
          required: [true, "el title es obligatorio"],
        },
        description: {
          type: String,
          required: [true, "La description es obligatoria"],
        },
    
        rate:{
          type:Number,
          
        },

        category:{
            type:Schema.Types.ObjectId,
            ref:"category"
          },

        imgUrl:{
            type:String,
            default:null,
          },

        // nameImage: String,
    
        public_id:String,
    
        //Relacion/referencia hacia la coleccion o tabla user , ya con esto tenemos la referencia
    
        user:{
          type:Schema.Types.ObjectId,
          ref:"user"
        },

        price:{
            type:Number,
            required:[true,"El price es obligatorio"]
        },

        stock:{
            type:Number,
            required:[true,"El stock es obligatorio"]
        }
    
    
      },
      {
        timestamps: true,
      }
)


productSchema.methods.setImg = function setImg({secure_url,public_id}){
    this.imgUrl = secure_url;
    this.nameImage= public_id;
  }
  
  
  export const productModel=model("product",productSchema)


