import { Schema, models, model } from "mongoose";

const orderSchema = Schema({
  userId: { type: String, required:  true },
  products: [{type:Object}],
  cardNumber: { type: String, required:  true },
  paymentStatus: { type: String, required:  true },
},{
  timestamps: true,
});

var OrderModal = models.orders || model('orders', orderSchema);

export default OrderModal; 