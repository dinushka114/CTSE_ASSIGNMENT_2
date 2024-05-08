const EmailService = require("../services/email.service");
const { SubscribeMessage } = require("../utils");

module.exports = (app,channel) =>{

    const service = new EmailService();

    SubscribeMessage(channel,service)

    app.post("/" , async(req,res)=>{
      service.sendEmail().then(response=>{
        res.status(200).json({message:"Emai is sent"})
      }).catch(err=>{
        res.status(500).json({message:"Server error"})
      })
    })





}