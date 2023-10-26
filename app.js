const express=require("express");
const server=express();
const clientRoute=require("./Routes/Client")
const productRoute=require("./Routes/product")
const orderRoute=require("./Routes/orders")
const pickupRoute=require("./Routes/pickedupreq")
const mongoose=require("mongoose");
let port=process.env.PORT||8080;
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/BOSTA_SHIPPING_DB")
      .then(()=>{
            server.listen(port,()=>{
                console.log("server is open now I am listening  ^_^", port);
            });
            console.log("DB successfully connected...");
         })
        .catch(error=>{
            console.log("DBproblem"+ error)
        })


server.use(express.json());
// routs
server.use(clientRoute)
server.use(productRoute)
server.use(orderRoute)
server.use(pickupRoute)

//Not Found
server.use((request,response,next)=>{
    response.status(404).json({data:"Not Found"});
});
// Error MiddleWar
server.use((error,request,response,next)=>{
    const status = error.status||500
    response.status(status).json({message:"Error "+error});
});