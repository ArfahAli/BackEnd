import productsModel from "./../models/products.js";

// Get all products
const getProducts = async (req, res) => {
  try {
    console;
    const products = await productsModel.find();
    // const items = products.map((product) => ({
    //   ...product._doc,
    //   image: "http://localhost:8000/" + product.image,
    // }));
    res.status(200).json(products);
  } catch (error) {
    console.error("broke");
    res.status(500).json({ error: "Failed to fetch products" });
  }
};



const postProduct = async (req, res) => {
  try {
    const { id, name, image, rating, price, quantity } = req.body;

    const newProduct = new productsModel({
      id,
      name,
      rating,
      image,
      price,
      quantity,
      // image: req.file.path,
    });
    const savedProduct = await newProduct.save();

    console.log("Product created successfully");
    console.log("Saved product:", savedProduct);
    res
      .status(201)
      .json({ message: "User registered successfully", Product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export { getProducts, postProduct };
