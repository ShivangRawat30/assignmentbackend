const connectDatabase = require("./config/database");
const Product = require("./models/productModel");

const productJSON = require("./product.json");

const start = async () => {
    try{
        await connectDatabase();
        await Product.create(productJSON);
        console.log("success");

    } catch(error){
        console.log(error);
    }
};

start();
