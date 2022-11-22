
import { encryptPassword } from "../helpers/encryptPassword.js";
import { generateToken } from "../helpers/generateToken.js";
import { response } from "../helpers/Response.js";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt"

const userCtrl = {}

userCtrl.register = async(req,res) =>{
    try {
        
        const {email,password,name,lastname} = req.body

        //vamos a validar que el email sea unico fijandonos en el modelo

        const user=await userModel.findOne({email})

        //Esto es una validacion , la podemos hacer desde aca o con express-validator 

        if(user){
            return response(res,400,false,null,"El correo ya se encuentra registrado ")
        }

        //como tenemos el return es como si remplazara a el else entonces no habria que colocar el else

        const  passwordEncryp = encryptPassword(password)

        const newUser = userModel({email,password:passwordEncryp,name,lastname})

        await newUser.save()

        const token = generateToken({user:newUser._id})
        response(res,201,true, {...newUser.toJSON(),password:null, token} ,"Usuario creado correctamente")


    } catch (error) {
        response(res,500,false,null,"Error en la funcion register",error.message)
    }
}

//Funcion para loguearnos

userCtrl.login = async (req,res)=>{
    try {
        
        //nosotros para logueanos vamos a requerir el correo y el password

        const {password,email} = req.body;

        //Vamos a confirmar que el correo ya este registrado

        const user = await userModel.findOne({email})

        //esta condicional que hicimos gracias a el bcrypt nos va a comparar el password de la database con el que el usuario ingrese

        if(user && bcrypt.compareSync(password,user.password)){

            const token = generateToken({user:user._id})

            return response(res,200,true,{...user.toJSON(),password:null,token},"Bienvenido")
        }
    
        response(res,400,false,null,"Correo o contraseña incorrectos")

    } catch (error) {
        response(res,500,false,null,"Error en la funcion login ",error.message)
    }
}







export default userCtrl