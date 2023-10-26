const mongoose=require("mongoose")
const autoIncrement=require("mongoose-sequence")(mongoose)
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
pickUpSchemaa.plugin(autoIncrement,{ inc_field:'_id'})
mongoose.model('PickedReqs',pickUpSchemaa)
