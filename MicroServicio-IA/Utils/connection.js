const mongoose = require('mongoose'); 

const startConecction= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_STRING,{
           /* useNewUrlParse:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false*/
        });

        console.log("Connection Exitosa con Mongo");
    }catch(e){
        console.log("Error Mongo Connnection : ", e);
    }
}

module.exports=startConecction;