import { Schema, models, model } from "mongoose";

const userSchema = Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String },
  isAdmin: {type: Boolean, default: false, required: true},
  googleAccount: {type: Boolean, default: false, required: true},
  cartItems:[],
  cardList:[{type:Object}],
},{
  timestamps: true,
});

var UserModal = models.users || model('users', userSchema);

export default UserModal; 