const nodemailer = require('nodemailer')
require('../Models/orders');
require('../Models/pickedupreques')
const mongoose=require("mongoose")
const orderSchema=mongoose.model("Orders");
const pickedUPRequestSchema=mongoose.model("PickedReqs");
exports.getorders=async(req,res,next)=>{
   await orderSchema.find().populate('clientId',{_id:0})
   .populate("products.productId",{_id:0})
    .then((data)=>{ res.status(200).json(data)})
    .catch(error=>{next(error)})
}
exports.addOrder=(req,res,next)=>{
    let addOrderSchema=new orderSchema({
        _id:req.body.id,
        clientId:req.body.clientId,
        products:req.body.products,
        paymentMethod:req.body.paymentMethod,
        "shippingAddress.city":req.body.shippingAddress.city,
        "shippingAddress.street":req.body.shippingAddress.street,
        "shippingAddress.building":req.body.shippingAddress.building,
        
    });
    addOrderSchema.save().then(
        (result)=>res.status(200).json({message:"New Order is added"})
    ).catch(error=>{next(error)})

}
exports.updateOrderStatus=(req,res,next)=>
{
    orderSchema.updateOne({_id:req.body.id},{$set:{status:req.body.status}}).
    then((result)=>{
         if(result.modifiedCount!=0)
         {
            res.status(200).json({data:"Updated Successfully ^_^"})
            orderSchema.findOne({_id:orderId}).populate('clientId',{_id:0})
            .then((data)=>{
                sendMail(req.status, data.clientId.email)
                
            }).catch(err=>next(err))
            
            if(req.body.status=="collected")
            {
              let addPickedUPRequestSchema=new pickedUPRequestSchema({
                orderId:req.body.id,
                
            });
            addPickedUPRequestSchema.save().then(
                (data)=>{
                    assignPickedRequestNumbertoOrder(data._id,data.orderId)
                }
            ).catch(error=>{next(error)})
             }
         }
         else{
          res.status(200).json({data:"No Difference Between old and new data^_^"})
         }
        
    }).catch(err=>next(err))
}
function sendMail(status,email){
    console.log("email is sending" +email)
    const transporter = nodemailer.createTransport({
       host: "live.smtp.mailtrap.io",
       port:587,
       secure: false,
       auth: {
       user: "api",
       pass:"1f0d7cc9a6a128cfb0cb5ad7f254ab90"
      }
    });
    
      const mailOptions = {
        from: 'alaaelshahat6703@gmail.com ',
        to: email,
        subject: 'Follow Up Your Shippment',
        text: ` Now :your order is`+status
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
  function assignPickedRequestNumbertoOrder(pickupReqNo,orderNo)
  {
    orderSchema.updateOne({_id:orderNo},{$set:{pickedupreqId:pickupReqNo}}).
    then(
     (result)=>
     {
      console.log("Updated successfully")
     } 
    ).catch(next(err))
  }
 