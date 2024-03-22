const express=require("express")
const mongoose=require("mongoose")
const app=express()
const server_config=require("./configs/server.config")
const db_config=require("./configs/db.config")
const user_model=require("./models/user.model")
const bcrypt=require("bcryptjs")
app.use(express.json())

mongoose.connect(db_config.DB_URL)
const db=mongoose.connection
db.on("error",()=>{
    console.log("Error While connecting to the database")
})
db.once("open",()=>{
    console.log("Connected to MongoDB")
    init()
})
async function init(){
    try{
        let user=await user_model.findOne({userId:"admin"})
        if(user){
        console.log("Admin is already present")
        return
    }
    }catch(err){
        console.log("Error While Reading Data",err)
    }
    
    try{
        user=await user_model.create({
            name:"Saquib",
            userId :"admin",
            email : "saquib@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("welcome1",8)
        })
        console.log("Admin Created",user)

    }catch(err){
        console.log("Error while create admin",err)
    }
}
require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)

app.listen(server_config.PORT,()=>{
    console.log("Server started at port num :",server_config.PORT)
})
