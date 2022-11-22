//Dar rutas
import { Router } from "express";
//validar los campos
import { check } from "express-validator";
//controlador
import categoryCtrl from "../controllers/category.controller.js"
//comparar token / permisos
import { verifyToken } from "../middleware/auth.js";
//Subir imagen
import { upload } from "../middleware/imgUpload.js";
//Funcion para validar campos
import { validFields } from "../middleware/ValidFields.js";


const route = Router();

route.get("/",categoryCtrl.listar)
route.get("/:id",categoryCtrl.listbyid)

//Añadir imagen    //El verifyToken se encarga de comparar el token del user con el del backend , si es el mismo va a continuar con lo siguiente 


route.post("/",verifyToken,upload.single("img"),

//Validacion con express validator colocamos lo que queremos validar y despues,
//llamamos la funcion validFields que la que va a validar los checks


[
    check("name","El campo name es obligatorio").notEmpty(),
    check("description","El campo description es obligatorio"),
    check("imgUrl","la imagen es obligatoria ").notEmpty()
],

validFields,

categoryCtrl.add)


// ----------------------------------

route.delete("/:id",verifyToken,categoryCtrl.delete)

route.put("/:id",verifyToken,upload.single("img"),categoryCtrl.update)





export default route;
