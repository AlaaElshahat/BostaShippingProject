const express=require("express")
const router=express()
const pickedUpReqController=require("../Controllers/PickedUpRequest")
router.route('/clients').get(pickedUpReqController.getPickedUPRequests).post(pickedUpReqController.addPickedUPRequest)
module.exports=router