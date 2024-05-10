const Product = require("../models/Product");
// Product Repository
class ProductsRepository {


  async GetProducts(){
    try {
      
      let products = await Product.find();

      return products;

    } catch (error) {
      throw error;
    }
  }

  async CreateProduct({ name, desc, banner, type, unit, price }) {
    try {
      const newProduct = new Product({
        name,
        desc,
        banner,
        type,
        unit,
        price,
      });

      await newProduct.save();

      return newProduct;
    } catch (err) {
      throw err;
    }
  }

  async UpdateProduct({ name, desc, banner, type, unit, price, id }) {
    try {
      await Product.findByIdAndUpdate(id, {
        name,
        desc,
        banner,
        type,
        unit,
        price,
      });

    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductsRepository;
