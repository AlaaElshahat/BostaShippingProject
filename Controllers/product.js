require('../Models/product');
const mongoose=require("mongoose")
const productSchema=mongoose.model("Product");
exports.getProducts=async(req,res,next)=>{
   await productSchema.find()
    .then((data)=>{ res.status(200).json(data)})
    .catch(error=>{next(error)})
}
exports.addProduct=(req,res,next)=>{
    let addProductSchema=new productSchema({
        _id:req.body.id,
        name:req.body.name,
        category:req.body.category, 
        price:req.body.price,
     
        
    });
    addProductSchema.save().then(
        (result)=>res.status(200).json({message:"New Product is added"})
    ).catch(error=>{next(error)})

}
