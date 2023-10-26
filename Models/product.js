const mongoose=require("mongoose")
const productSchema=new mongoose.Schema(
    {
        _id:{type:Number} ,
        name:{ type:String,required:true,
            match:/^[a-z]{3,}$/i},
        category:{ type:String,required:true,
                match:/^[a-z]{3,}$/i},
        price:{type:Number,required:true}
    },{_id:false}
)
mongoose.model('Product',productSchema)