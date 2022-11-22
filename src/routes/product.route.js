import { Router } from "express";
//validar los campos
import { check } from "express-validator";
//controlador
import productCtrl from "../controllers/product.controller.js"
//comparar token / permisos
import { verifyToken } from "../middleware/auth.js";
//Subir imagen
import { upload } from "../middleware/imgUpload.js";
//Funcion para validar campos
import { validFields } from "../middleware/ValidFields.js";

const route = Router()

route.get("/",productCtrl.listar)

route.get("/:id",productCtrl.listbyid)



route.post("/",verifyToken,upload.single("img"),

[

    check("name","El nombre es obligatorio").notEmpty(),
    check("description","El campo description es obligatorio").notEmpty(),


    //Validacion Custom o personalizada
    check("rate","El rate es obligatorio").notEmpty().custom((value,{req})=>{
        if(value < 1  || value > 5){
            throw new Error("El rate debe ser entre 1 y 5 siendo 1 el mas bajo y el 5 el mas alto")
        }
        //Si retornamos un true el asume de que la validacion custom a pasado correctamente
        return true
    }),


    check("price"," el price es obligatorio ").isNumeric(),
    check("stock","el stock es obligatorio").isNumeric(),
    check("category","la categoria es obligatoria").notEmpty(),
    check("user","el user es obligatorio").notEmpty(),
    


],validFields,productCtrl.add)






route.delete("/:id",verifyToken,productCtrl.deleted)

route.put("/id",verifyToken,productCtrl.update)



export default route;

