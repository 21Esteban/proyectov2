import { validationResult } from "express-validator";
import { response } from "../helpers/Response.js";

//Estamos haciendo uso del express validator que se encarga de darnos un resultado luego de que el aplica
//todas las validaciones y si el consigue un error nos los va a retornar o de lo contrario va a continuar con el siguiente paso que 
//es el controlador.   

export const validFields = (req,res,next) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return response(res,400,false,"",errors)
    }
    next();
    }