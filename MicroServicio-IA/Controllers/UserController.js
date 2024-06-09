const {User} = require('../Models/UserModel');
const {Image} = require('../Models/ImageModel');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const login = async(req,res)=> {
    try{

        const email = req.body.email;
        const {tempFilePath} = req.files.image;
        const user = await User.find({email});

            if(user && tempFilePath){
                const response = await cloudinary.uploader.upload(tempFilePath);
                const {secure_url,public_id}=response;

                const imageDataBase = await Image.findOne({user})
                const url2 = imageDataBase['url'];
                const datosLuxand = await compararImagenes(secure_url,url2);
                    if(datosLuxand){
                        cloudinary.uploader.destroy(public_id);
                        return res.status(200).json({
                            "res":true,
                            "message":"login Exitoso",
                            "datos luxand ":datosLuxand,
                        });
                    }
                cloudinary.uploader.destroy(public_id);
                return res.status(400).json({
                    "res":false,
                    "message":"Datos erroneos",
                });

             
            }else{
                return res.status(400).json({
                    "res":false,
                    "message":"User no Existe",
                });
            }
    }catch(error){
        console.log("Error en login:  ", error);
        return res.status(500).json({
            "Error": "Error Loguearse"
        });
    }
 
}


const createUser = async(req,res)=>{
    try{
        const {email,password,url} = req.body;
        const newUser = new User({email,password});

        await newUser.save();

        const newImage = new Image({
            user:newUser,
            'url':url,
        });
        await newImage.save();

        return res.status(200).json({
            "res":true,
            "User":newUser,
        });
    }catch(error){

        console.log("Error Server : ", error);
        return res.status(400).json({
            "res":false,
            "Error":"Ocurrio un Error en el Registrar"
        });
    }
    
}

async function compararImagenes(url1, url2) {
    try {
        const headers = {
            "token": process.env.TOKEN_LUXAND,
        };
        const form = new FormData();
        form.append("face1",url1);
        form.append("face2",url2);
        form.append("threshold", "0.8");
        
        headers['Content-Type'] = `multipart/form-data; boundary=${form.getBoundary()}`;
        const options = {
            method: "POST",
            url: process.env.URL_LUXAND,
            headers: headers,
            data: form
        };
        const response = await axios(options);
        return response.data.similar;
    } catch (error) {
        console.error('Error al comparar las imágenes:', error);
        throw error;
    }
}



module.exports= {
    login,
    createUser,
}


