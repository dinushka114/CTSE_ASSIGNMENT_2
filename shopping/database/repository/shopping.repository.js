const Cart = require("../models/Cart");
const Order = require("../models/Order");
class ShoppingRepository {
  async FindCart(userId) {
    let cart = await Cart.findOne({ customerId:userId });
    return cart;
  }

  async NewCart(userId, product,quantity) {
    let cart = await this.FindCart(userId);

    if (!cart) {
      cart = new Cart({ customerId:userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product._id === product._id
    );

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: product, quantity });
    }

    cart.total = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    let newCart = await cart.save();
    return newCart;
  }

  async GetCart(userId){
    let cart = await this.FindCart(userId);
    return cart;
  }

  async PlaceOrder(response){

      let items = [];

      response.cart.items.map(item=>{
        items.push(item.name);
      })

      console.log(items+"ITEMSSSSSSSSSSSSSSSSSSSSSSSSSS")
    
  }
}

module.exports = ShoppingRepository;
