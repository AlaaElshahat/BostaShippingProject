require('../Models/product');
const mongoose=require("mongoose")
const pickedUPRequestSchema=mongoose.model("PickUPReq");
exports.getPickedUPRequests=async(req,res,next)=>{
   await pickedUPRequestSchema.find().populate()
    .then((data)=>{ res.status(200).json(data)})
    .catch(error=>{next(error)})
}
exports.addPickedUPRequest=(req,res,next)=>{
    let addPickedUPRequestSchema=new pickedUPRequestSchema({
        _id:req.body.id,
        orderId:req.body.orderId,
        
    });
    addPickedUPRequestSchema.save().then(
        (result)=>res.status(200).json({message:"New PickedUP request is added"})
    ).catch(error=>{next(error)})

}