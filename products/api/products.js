const ProductService = require("../services/products.service");

module.exports = (app) => {
  const service = new ProductService();

  app.get("/", async (req, res) => {
    try {
      const response = await service.GetProducts();

      if (response.success) {
        res.status(200).json({ message: response.products });
      } else {
        res.status(400).json({ error: response.products });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/", async (req, res) => {
    const { name, desc, banner, type, unit, price } = req.body;

    try {
      const response = await service.AddNewProduct({
        name,
        desc,
        banner,
        type,
        unit,
        price,
      });

      if (response.success) {
        res.status(201).json({ message: response.message });
      } else {
        res.status(400).json({ error: response.message });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.put("/:id", async (req, res) => {
    const { name, desc, banner, type, unit, price } = req.body;
    const id = req.params.id;

    try {
      const response = await service.UpdateProduct({
        name,
        desc,
        banner,
        type,
        unit,
        price,
        id,
      });

      if (response.success) {
        res.status(201).json({ message: response.message });
      } else {
        res.status(400).json({ error: response.message });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
