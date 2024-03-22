const authController =require("../controllers/auth.controller")
const authMW=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/singup",[authMW.verifySignUpBody],authController.signup)



    app.post("/ecomm/api/v1/auth/singin",[authMW.verifySignInBody],authController.signin)
}