const express=require("express")
const router=express()
const pickedUpReqController=require("../Controllers/PickedUpRequest")
router.route('/pickedReq').get(pickedUpReqController.getPickedUPRequests).post(pickedUpReqController.addPickedUPRequest)
module.exports=router