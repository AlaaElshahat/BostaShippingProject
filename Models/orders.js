const mongoose=require("mongoose");
const autoIncrement=require("mongoose-sequence")(mongoose)
const {AddressSchema}=require("./sharedSchemaes")
const orderSchema=new mongoose.Schema({
   _id:{type:Number} ,
   clientId:{type:Number,ref:"Client"},
   pickedupreqId:{type:Number,ref:"PickedReq"},
   products:[
    {
        productId:{type:Number,ref:"Product"},
        quantity:{type:Number},
    }
   ],
   status:{
        type:String,
        enum:['Pending','Packeged','collected','PickedUP','returned','Received'],
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
// orderSchema.plugin(autoIncrement);
mongoose.model('Orders',orderSchema)