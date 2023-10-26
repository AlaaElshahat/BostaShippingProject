const express=require("express")
const router=express()
const {productValidation}=require("../MiddleWare/Validation")
const validationError=require("../MiddleWare/Validation-error")
const productController=require("../Controllers/product")
router.route('/products').get(productController.getProducts).post(productValidation,validationError,productController.addProduct)
module.exports=router