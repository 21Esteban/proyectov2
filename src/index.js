import cors from "cors"
import express from "express";
import morgan from "morgan"
import { connectDb } from "./database.js";
import  { dirname } from "path";
import { fileURLToPath } from "url";



import userRoutes from "../src/routes/user.route.js"
import categoryRoutes from "../src/routes/category.route.js"
import productRoutes from "../src/routes/product.route.js"
import facturaRoutes from "../src/routes/factura.route.js"


connectDb()


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.set("Port", 4000);
app.use("/public",express.static(__dirname + "/storage/imgs"))
app.use(morgan("dev"));
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Aqui va a ir la ruta de user

app.use("/user",userRoutes)

//Aqui va a ir la ruta de category

app.use("/category",categoryRoutes)


//Aqui va a ir la ruta de product

app.use("/product",productRoutes)

//Aqui va a ir la ruta de factura

app.use("/factura",facturaRoutes)

//Servidor

app.listen(app.get("Port"),()=>{
    console.log("Servidor escuchando por el puerto" , app.get("Port"));
});