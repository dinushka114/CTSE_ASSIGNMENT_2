const { Schema, model } = require("mongoose");

const shoppingCartSchema = new Schema({
    customerId: {
        type: String, 
        required: true
    },
    items: [{
        product: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    total: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


module.exports = model("ShoppingCart", shoppingCartSchema);