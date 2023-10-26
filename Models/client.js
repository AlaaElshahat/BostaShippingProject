const mongoose=require("mongoose");
const {AddressSchema}=require("./sharedSchemaes")
const clientSchema=new mongoose.Schema({
    _id:{type:Number} ,
    clientName:{
        type:String,required:true,
        match:/^[a-z]{3,}$/i
    },
    email:{type:String,
        match: /.+\@.+\..+/,
        },  
    phoneNumber:{type:String,
        minlength:12
        ,maxlength:12,
        match:/^(010|011|012|015)+-+\d{8}$/
    },
    address:AddressSchema
   
},{_id:false})
mongoose.model('Client',clientSchema)