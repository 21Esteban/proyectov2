import { response } from "../helpers/Response.js"
import {facturaModel} from "../models/factura.model.js"
import { productModel } from "../models/product.model.js"

const facturaCtrl = {}

facturaCtrl.listar = async (req,res) => {
    try {
        const facturas = await facturaModel.find().populate("product").populate("user").sort({createAt:-1})

        response(res,200,true,facturas,"Lista de facturas")
        

    } catch (error) {
        response(res,500,false,null,error.message)
    }
}


 facturaCtrl.listbyid = async (req,res) => {
    try {
        console.log(req.userId)

        const {id} = req.params

        const factura = await facturaModel.findById(id)

        if(!factura){
            return response(res,404,false,null,"Factura no encontrada")
        }

        response(res,200,true,factura,"Factura encontrada")


    } catch (error) {
        response(res,500,false,"",error.message) 
    }
 }


 facturaCtrl.add = async (req,res) => {
    try {
        
        const {product,quantity,user} = req.body

        //Stock

        const producto = await productModel.findOne({_id:product})

        const price =producto.price
        
        const stock = producto.stock

        console.log(stock);

        //arreglar esto que no me hace la cuenta me da errror

        const total = price*quantity

        
    
       if(quantity>stock){
        return response(res,400,false,null,`no hay stock disponible para esa cantidad , stock disponible : ${stock} `)
       }

        const newFactura = new facturaModel({
            product,
            quantity,
            user,
            total:total
            
        })

        await facturaModel.create(newFactura)
        response(res,201,true,newFactura,"factura creada correctamente ");


        // DEBE REALIZAR LA RESTA DEL STOCK DEL PRODUCTO COMPRADO.

        const restaStock = stock - quantity

        console.log(restaStock);

        await productModel.updateOne({stock:restaStock});


    } catch (error) {
        response(res,500,false,"",error.message)
    }
 }


 facturaCtrl.delete = async (req,res) => {
    try {


        const {id} = req.params;

        const factura = await facturaModel.findById(id)

        //Cuando buscamos la factura con el findById podemos acceder al product id que nos
        //lo trae con el metodo get en el postman

        const product = await productModel.findOne({product:id})

        const stock = product.stock


        if(!factura){
            return response(res,404,false,"","factura no encontrado ")}

            
    

        await factura.deleteOne();

        response(res,200,true,"","factura eliminada correctamente")

        // RESTAURAR EL STOCK DEL PRODUCTO SI LA FACTURA ES ELIMINADA.

        

        const stockRestaurado = stock + factura.quantity

        await productModel.updateOne({stock:stockRestaurado})

    } catch (error) {
        response(res,500,false,"",error.message)
    }
}




facturaCtrl.update = async (req,res)=>{
    try {

        const {id}  =req.params
        
        const facturaAactualizar = await facturaModel.findById(id)

        // RESTAR EL STOCK O SUMAR EL STOCK DEL PRODUCTO SI LA FACTURA ES 
        // EDITADA.

        
        
        

        if (!facturaAactualizar){
           return response(res,404,false,null,"La factura no encontrada")
        }

        await facturaAactualizar.updateOne(req.body)


        if(req.body.quantity){


        }


    } catch (error) {
        response(res,500,false,"",error.message)
    }
}






export default facturaCtrl;