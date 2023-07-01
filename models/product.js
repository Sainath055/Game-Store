import { Schema, models, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true }, 
  genre: { type: Object, required: true },
  rating: { type: Number, required: true },
  platform: { type: Object, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  description: { type: String, required: true },
  mainImg: { type: String, required: true },
  videoLinkKey: { type: String, required: true },
  images: { type: Object, required: true },
  saved: { type: [String], default: [] },
  library: { type: [String], default: [] },
},{
  timestamps: true,
});

var ProductModal = models.products || model('products', productSchema);

export default ProductModal;