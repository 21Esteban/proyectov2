import { subirImagenACloudinary } from "../helpers/cloudinary.actions.js";
import { response } from "../helpers/Response.js";
import {categoryModel} from "../models/category.model.js"
import { productModel } from "../models/product.model.js";

const categoryCtrl = {}

categoryCtrl.listar = async (req,res) =>{
    try {
        console.log(req.userId)


        const categorys = await categoryModel.find().sort({createAt:-1})

        response(res,200,true,categorys,"Lista de categorias")

    } catch (error) {
        response(res,500,false,null,error.message)
    }
}


categoryCtrl.listbyid = async (req,res) =>{
    try {
       
        const {id} = req.params;

        const category = await categoryModel.findById(id)

        if(!category){
            return response(res,404,false,null,"Category no encontrada")
        }

        response(res,200,true,category,"Category encontrada")


    } catch (error) {
        response(res,500,false,null,`Error en la funcion categoryCtrl.listbyid ${error.message}`) 
    }
}

categoryCtrl.add= async(req,res) =>{
    try {
        
        const {name,description} = req.body
        const newCategory = new categoryModel({
            name,
            description,
            user:req.userId
        })

        if(req.file){

            //el public id es el nameImage y el secure_url es el  imgUrl

            const {secure_url,public_id} = await subirImagenACloudinary(req.file)
            newCategory.setImg({secure_url,public_id})
        }

        await categoryModel.create(newCategory);
        response(res,201,true,newCategory,"Post creado correctamente ");


    } catch (error) {
        console.log(error.message)
        response(res,500,false,null,`Error en la funcion categoryCtrl.add ${error.message}`)
    }
}

categoryCtrl.delete = async (req,res) => {
    try {


        const {id} = req.params;

        const category = await categoryModel.findById(id)


        if(!category){
            return response(res,404,false,"","category no encontrada ")}

            //el public id es el nameImage y el secure_url es el  imgUrl
        
        if(category.public_id){
            await eliminarImagenCloudinary(category.public_id)
        }

        //LA CATEGORY NO SE DEBE DEJAR ELIMINAR SI HAY ALGÚN PRODUCTO ASOCIADO A ELLA

        const product = await productModel.findOne({category:id})

        if(product){

        return response(res,400,false,null,"No puedes eliminar la categoria porque hay productos asociados, elimine los productos asociados para continuar")

        }
        

        await category.deleteOne();

        response(res,200,true,"","category eliminada correctamente")

    } catch (error) {
        response(res,500,false,null,error.message)
    }
}

categoryCtrl.update = async (req,res) => {
    try {

        const {id} = req.params;

        const category = await categoryModel.findById(id)


        if(!category){
            return response(res,404,false,null,"category no encontrada")}

       

        if(req.file){

            //el public id es el nameImage y el secure_url es el  imgUrl

            if(category.public_id){
                await eliminarImagenCloudinary(category.public_id)
            }
            const {secure_url,public_id}  = await subirImagenACloudinary(req.file)
            category.setImg({secure_url,public_id});
            await category.save()
        }


        await category.updateOne(req.body);

        response(res,200,true,"","Post actualizado ")

    } catch (error) {
        response(res,500,false,null,error.message)
    }
}







export default categoryCtrl;