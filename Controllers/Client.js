require('../Models/client');
const mongoose=require("mongoose")
const clientSchema=mongoose.model("Client");
exports.getClients=async(req,res,next)=>{
   await clientSchema.find()
    .then((data)=>{ res.status(200).json(data)})
    .catch(error=>{next(error)})
}
exports.createClient=(req,res,next)=>{
    let addClientSchema=new clientSchema({
        _id:req.body.id,
        clientName:req.body.fullName,
        email:req.body.email, 
        phoneNumber:req.body.phoneNumber,
        "address.city":req.body.address.city,
        "address.street":req.body.address.street,
        "address.building":req.body.address.building,
     
        
    });
    addClientSchema.save().then(
        (result)=>res.status(200).json({message:"New Client is added"})
    ).catch(error=>{next(error)})

}
