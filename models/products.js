import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const productsModel = mongoose.model("product", productSchema);

export default productsModel;