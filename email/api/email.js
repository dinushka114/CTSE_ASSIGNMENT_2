const EmailService = require("../services/email.service")

module.exports = (app) =>{

    const service = new EmailService();

    app.post("/" , async(req,res)=>{
      service.sendEmail("piyumalbchandrarathna@gmail.com").then(response=>{
        res.status(200).json({message:"Emai is sent"})
      }).catch(err=>{
        res.status(500).json({message:"Server error"})
      })
    })

}