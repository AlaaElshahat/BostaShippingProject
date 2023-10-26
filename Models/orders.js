const mongoose=require("mongoose");
const {AddressSchema}=require("./sharedSchemaes")
const orderSchema=new mongoose.Schema({
   _id:{type:Number} ,
   clientId:{type:Number,ref:"Client"},
   products:[
    {
        productId:{type:Number,ref:"Product"},
        quantity:{type:Number},
    }
   ],
   status:{
        type:String,
        enum:['Pending','Packeged','awaitingToPicked UP','PickedUP','returned','Received'],
        default:'Pending'
   },
   paymentMethod:{
    type:String,
    enum:['COD','CreditCard']
},
tatalAmount:{
    type:Number,
},
shippingAddress:AddressSchema,
orderDate:{
    type:Date,
    default:Date.now()
}
},{_id:false})
mongoose.model('Orders',orderSchema)