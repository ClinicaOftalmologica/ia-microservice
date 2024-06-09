const { ObjectId } = require('bson');
const {Schema,model} = require('mongoose');

const image = Schema({
        url:{
            type:String,
            required:true,
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
            require:true,
        },
        state:{
            type:Boolean,
            default:true,
        }
});


const Image = model("Image",image);

module.exports={
    Image,
}