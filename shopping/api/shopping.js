const { extractUserId, extractUserEmail } = require("../middlewares");
const ShoppingService = require("../services/shopping.service");
const { PublishMessage } = require("../utils");
require("dotenv").config();

module.exports = (app, channel) => {
  const service = new ShoppingService();

  app.post("/", async (req, res) => {
    let userId = extractUserId(req, res);

    const { product, quantity } = req.body;

    try {
      const response = await service.AddToCart(userId, product, quantity);

      if (response.success) {
        res.status(201).json({ message: response.message });
      } else {
        res.status(400).json({ error: response.message });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/", async (req, res) => {
    let userId = extractUserId(req, res);

    if (userId) {
      try {
        const response = await service.GetCart(userId);
        if (response.success) {
          return res.status(201).json({ message: response.cart });
        } else {
          return res.status(400).json({ error: response.cart });
        }
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }else{
        return res.status(403).json({ error: "Invalid" });
    }
  });


  app.post("/order", async(req,res)=>{
    let userId = extractUserId(req, res);
    let userEmail = extractUserEmail(req,res);
    if (userId && userEmail) {
        try {
          const response = await service.GetCart(userId);

          const newOrder = await service.NewOrder(response);

          let payload = {
            data:userEmail,
            event:'SEND_EMAIL'
          }
        
          PublishMessage(channel, process.env.EMAIL_BINDING_KEY, JSON.stringify(payload))

        } catch (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }else{
          return res.status(403).json({ error: "Invalid" });
      }

  })

};
