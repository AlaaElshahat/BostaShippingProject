const mongoose= require('mongoose')

exports.AddressSchema=new mongoose.Schema({
    city:{type:String,minlength:"4",required:true},
    street:{type:String,minlength:"4",required:true},
    building:{type:Number ,min:1}
},{ _id : false });
   