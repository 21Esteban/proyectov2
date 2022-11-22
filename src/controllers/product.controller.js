import {productModel} from "../models/product.model.js"
import { response } from "../helpers/Response.js"
import { subirImagenACloudinary } from "../helpers/cloudinary.actions.js";

const productCtrl={};

productCtrl.listar = async (req,res) =>{
    try {
        console.log(req.userId)

        const products = await productModel.find().populate("user",{password:0}).populate("category").sort({createAt:-1})

        response(res,200,true,products,"Lista de productos")

    } catch (error) {
        response(res,500,false,null,`Error en productCtrl.listar ${error.message}`)
    }
}

productCtrl.listbyid = async (req,res) =>{
    try {
        
        const {id} = req.params

        const product = await productModel.findById(id)

        if(!product){
            return response(res,404,false,null,"product no encontrado")
        }

        response(res,200,true,product,"Producto encontrado")



    } catch (error) {
        response(res,500,false,null,`Error en productCtrl.listbyid ${error.message}`)
    }
}





productCtrl.add = async (req,res) =>{
    try {

        //Estos datos nos van a llegar del req.body
        const {name,description,rate,category,user,price,stock} = req.body

        const newProduct = new productModel({
            name,
            description,
            rate,
            category,
            user,
            price,
            stock


        })

        //si nos llega algo por el req.file vamos a subir esa imagen la db
        
        if(req.file){
            const {secure_url,public_id} = await subirImagenACloudinary(req.file)
            newProduct.setImg({secure_url,public_id})
        }

        //Vamos a crear el producto con todo lo que nos llego de la const newProduct

        await productModel.create(newProduct)

        response(res,201,true,newProduct,"Product created succesfully")

    } catch (error) {
        response(res,500,false,null,`Error en productCtrl.add ${error.message}`)
    }
}




productCtrl.deleted = async (req,res) =>{
    try {

        const {id} = req.params

    const product = await productModel.findById(id)

    if(!product){
        return response(res,404,false,"","product no encontrado ")}

    
    if(product.public_id){
        await eliminarImagenCloudinary(product.public_id)
    }

    await product.deleteOne();

    response(res,200,true,"","product eliminado correctamente")

    } catch (error) {
        response(res,500,false,null,error.message)
    }
    



}


productCtrl.update=async (req,res) =>{
    try {
        
        const {id} = req.params

       const product = await productModel.findById(id)

       if(!product){
        return response(res,404,false,null,"Product no encontrado")
       }

       if(req.file){

        
        //el public id es el nameImage y el secure_url es el  imgUrl

        if(product.public_id){
            await eliminarImagenCloudinary(product.public_id)
        }
        const {secure_url,public_id}  = await subirImagenACloudinary(req.file)
        product.setImg({secure_url,public_id});
        await product.save()
    }

    await product.updateOne(req.body)

    response(res,200,true,"","product actualizado correctamente")

    } catch (error) {
        response(res,500,false,null,error.message)
    }
}

export default productCtrl;