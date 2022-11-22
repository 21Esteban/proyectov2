import mongoose from "mongoose";


const { Schema, model } = mongoose;

const facturaSchema = new Schema(
    {
      product: { 
        
        type:Schema.Types.ObjectId,
        ref:"product"
    
      },
      quantity: {
        type: Number,
        required: [true, "el quantity es obligatorio"],
      },
  
      user:{
        type:Schema.Types.ObjectId,
        ref:"user"
      },

      total:Number
       
      
     
  
    
    },
    {
      timestamps: true,
    }
  );

  export const facturaModel=model("factura",facturaSchema)