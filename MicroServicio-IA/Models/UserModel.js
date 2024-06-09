const {Schema,model} = require('mongoose');

const user = Schema({
        email:{
            type:String,
            require:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        state:{
            type:Boolean,
            default:true,
        }
});


const User = model("User",user);

module.exports={
    User
}