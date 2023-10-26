const express=require("express")
const router=express()
const {clientValidation}=require("../MiddleWare/Validation")
const validationError=require("../MiddleWare/Validation-error")
const clientController=require("../Controllers/Client")
router.route('/clients').get(clientController.getClients)
.post(clientValidation,validationError,clientController.createClient)
module.exports=router