import React from "react";
import { motion } from "framer-motion";
import {
  BsFillPatchPlusFill,
  BsFillPatchMinusFill,
  BsFillFileXFill,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  incrementQty,
  decrementQty,
} from "../redux/productSlice";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, image, description, qty, total, id } = product;
  console.log(product);

  const handleRemoveFromCart = () => {
    dispatch(removeCartItem(id));
  };

  const handleIncrementQty = () => {
    dispatch(incrementQty(id));
  };

  const handleDecrementQty = () => {
    dispatch(decrementQty(id));
  };

  return (
    <div className="bg-slate-800 p-1 gap-2">
      <div className=" bg-white p-2 md:p-4 flex sm:justify-between md:flex-row gap-4">
        <div className="p-3 rounded overflow-hidden">
          <img src={image} alt="" className="h-full w-[200px] object-cover" />
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mb-4">{name}</h1>
            <span className="ml-2">
              <BsFillFileXFill
                className="text-5xl cursor-pointer"
                onClick={handleRemoveFromCart}
              />
            </span>
          </div>
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <p className="text-xl font-bold">Price: {price}</p>
          <div className="flex md:flex-row gap-4 mt-6">
            <motion.button
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded w-30 md:w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={handleIncrementQty}
            >
              <BsFillPatchPlusFill className="text-xl" />
            </motion.button>
            <p className="text-3xl font-bold text-red-500 md:text-4xl">{qty}</p>
            <motion.button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-30 md:w-auto"
              onClick={handleDecrementQty}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <BsFillPatchMinusFill className="text-2xl" />
            </motion.button>
          </div>
          <div className="flex">
            <span className="text-xl font-bold text-red-500">Total:</span>
            <span className="text-xl font-bold ml-1">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
