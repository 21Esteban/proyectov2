//Dar rutas
import { Router } from "express";
//validar los campos
import { check } from "express-validator";
//controlador
import facturaCtrl from "../controllers/factura.controller.js";
//comparar token / permisos
import { verifyToken } from "../middleware/auth.js";
//Funcion para validar campos
import { validFields } from "../middleware/ValidFields.js";

const route = Router()

route.get("/",facturaCtrl.listar)

route.get("/:id",facturaCtrl.listbyid)

route.post("/",verifyToken,

[

check("product","El id del producto es obligatorio ").notEmpty(),
check("quantity","El quantity es necesario").notEmpty().isNumeric(),
check("user","El user es obligatorio").notEmpty()


],validFields,

facturaCtrl.add)

route.delete("/:id",verifyToken,facturaCtrl.delete)

route.put("/:id",verifyToken,facturaCtrl.update)



export default route;
