const express = require('express');
const server = require('http');
const connection = require('../Utils/connection');
const exp = require('constants');
const fileUpload = require('express-fileupload')
const cors = require('cors');
require('dotenv').config();



class Server{

    constructor(){
        this.puerto=4000;
        this.app=express();
        this.startServer();
        this.startConnection();
        this.startMiddlewares();
        this.startCors();
        this.startRoutes();
    }


    startConnection(){
        connection();
    }


    startServer(){
        this.app.listen(this.puerto,()=>{
            console.log("Listening on Port ", this.puerto);
        });
    }


    startMiddlewares(){
        this.app.use(express.json());
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            useTempFiles : true,
            tempFileDir : '/tmp/'
          }));
          
    }


    startRoutes(){
        this.app.use('/auth',require('../Routes/user-route'));
    }

    startCors(){
       this.app.use(cors())
    }




}


module.exports=Server;