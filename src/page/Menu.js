import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AllProduct from "../component/AllProduct";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {
  const { filterby } = useParams();
  const productdata = useSelector((state) => state.product.products);

  const product = productdata.find((el) => el._id === filterby);

  const { name, price, image, description } = product;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addCartItem(product));
  };
  const handleBuyNow = () => {
    // Implement the logic to initiate the buy now process
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl bg-white p-8 rounded-lg flex flex-col md:flex-row items-center md:gap-8 md:mt-40 shadow-lg hover:shadow-xl"
        >
          <div className="md:w-1/2 md:text-3xl">
            <motion.img
              src={image}
              alt={name}
              className="w-full rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <h1 className="text-4xl font-bold mb-4">{name}</h1>
            <p className="text-lg text-gray-700 mb-4">{description}</p>
            <p className="text-3xl font-bold">Price: {price}</p>
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <motion.button
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded w-full md:w-auto"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Add to Cart
              </motion.button>
              <motion.button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full md:w-auto"
                onClick={handleBuyNow}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      <AllProduct heading={"Related products"} />
    </>
  );
};

export default Menu;
