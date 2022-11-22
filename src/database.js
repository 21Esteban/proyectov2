import mongoose from "mongoose";

//para conectar la base de datos a la nube
const uri = "mongodb+srv://prueba:prueba@cluster0.ptdypkd.mongodb.net/proyecto";

export const connectDb = async () => {

    try {

        const db = await mongoose.connect(uri);
        console.log("base de datos conectada " , db.connection.name);
        
    } catch (error) {
        console.log(`error al conectarse a la base de datos ${error.message}`);
    }


};