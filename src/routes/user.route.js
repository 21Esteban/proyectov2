//Importamos la rutas
import { Router } from "express";
import { check } from "express-validator";
//importamos nuestro controlador
import userCtrol from "../controllers/user.controller.js";
import { validFields } from "../middleware/ValidFields.js";

const route = Router()


//Validacion con express validator colocamos lo que queremos validar y despues,
//llamamos la funcion validFields que la que va a validar los checks

route.post("/register",[check("email","El email no es valido").exists().isEmail()],validFields,userCtrol.register)

route.post("/login",userCtrol.login)

export default route;
