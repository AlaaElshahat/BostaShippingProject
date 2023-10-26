const nodemailer = require('nodemailer')
require('../Models/orders');
const mongoose=require("mongoose")
const orderSchema=mongoose.model("Orders");
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
            sendMail(req.status,"alaaelsayed136@gmail.com")
         }
        
    }).catch(err=>next(err))
}
function sendMail(status,email){
    console.log("email sended")
    const transporter = nodemailer.createTransport({
      host: "0.0.0.0",
       port:1025,
      secure: false,
      auth: {
      user: "eng.samahelgayar@gmail.com",
      pass:"********"
     }
    });
    
      const mailOptions = {
        from: 'eng.samahelgayar@gmail.com',
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