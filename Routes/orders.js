const express=require("express")
const router=express()
const {orderValidation}=require("../MiddleWare/Validation")
const validationError=require("../MiddleWare/Validation-error")
const ordersController=require("../Controllers/orders")
router.route('/orders').get(ordersController.getorders)
.post(orderValidation,validationError,ordersController.addOrder).patch(ordersController.updateOrderStatus)
module.exports=router