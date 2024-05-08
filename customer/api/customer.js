const CustomerServise = require("../services/customer.service");
// const { SubscribeMessage } = require("../utils");

module.exports = (app, channel) => {
    const service = new CustomerServise();

    // SubscribeMessage(channel, service)

    app.post("/signup", async(req,res)=>{
        const {name, email, password} = req.body;

        try{
          const response =   await service.RegisterCustomer({name, email, password});

          if (response.success) {
            res.status(201).json({ message: response.message });
          } else {
            res.status(400).json({ error: response.message });
          }

        }catch(error){
            res.status(500).json({ error: "Internal Server Error" });
        }

    })

    app.post("/signin", async(req,res)=>{

        const {email, password } = req.body;

        try{
            const response = await service.LoginCustomer({email, password})
            if (response.success) {
                res.status(201).json({ message: response.message });
              } else {
                res.status(400).json({ error: response.message });
              }

        }catch(error){
            console.log(error)
            res.status(500).json({ error: "Internal Server Error" });
        }

    })

}