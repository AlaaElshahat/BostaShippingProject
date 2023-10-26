const mongoose=require("mongoose")
const pickUpSchemaa=mongoose.Schema(
    {
        _id:{type:Number} ,
        orderId:{type:Number,ref:"Order"},
        reqDate:{
            type:Date,
            default:Date.now()
        }
    },{_id:false}
)
mongoose.model('PickedReqs',pickUpSchemaa)
