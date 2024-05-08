const ShoppingRepository = require("../database/repository/shopping.repository");

class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async AddToCart(userId, product, quantity) {
    let cart = await this.repository.NewCart(userId, product, quantity);

    if (cart) {
      return { success: true, message: "Added to the cart" };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  }

  async GetCart(userId) {
    let cart = await this.repository.FindCart(userId);
    if (cart) {
      return { success: true, cart:cart };
    } else {
      return { success: false, cart:null };
    }
  }

  async SubscribeEvents(payload) {
    const p = JSON.parse(payload);

    const { event, data } = p;

    switch (event) {
      case "ADD_TO_CART":
        await this.AddToCart(data);
        break;

      default:
        break;
    }
  }
}

module.exports = ShoppingService;
