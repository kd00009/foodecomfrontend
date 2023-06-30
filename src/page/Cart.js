import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import emptyCartImage from "../assest/empty.gif";

const Cart = () => {
  const productCartItems = useSelector((state) => state.product.cartItem);
  const totalPrice = productCartItems.reduce(
    (total, item) => total + parseInt(item.total),
    0
  );
  const totalqty = productCartItems.reduce(
    (total, item) => total + parseInt(item.qty),
    0
  );

  return (
    <>
      {productCartItems.length === 0 ? (
        <div className="bg-white p-4 mt-4 flex justify-center">
          <p className="text-3xl text-capitalize text-cyan-800 font-bold mb-2">
            Your cart is empty
          </p>
          <div className="flex items-center justify-center">
            <img className="w-50 h-50 mx-auto" src={emptyCartImage} alt="" />
          </div>
        </div>
      ) : (
        <div className="p-2 md:p-4">
          <h2 className="text-lg md:text-2xl font-bold text-slate-700">
            Your Cart Items
          </h2>
          <div className="flex flex-col md:flex-row md:gap-2">
            <div className="md:flex-1">
              {productCartItems.map((el) => {
                return <CartProduct key={el._id} product={el} />;
              })}
            </div>
            <div className="md:flex-1 mt-4 md:mt-0 md:text-center">
              <h2 className="text-lg md:text-2xl font-bold text-slate-700 bg-blue-400">
                Summary
              </h2>
              <div className="bg-white p-4 mt-4">
                <p className="text-xl font-bold mb-2">
                  Total quantity: {totalqty}
                </p>
                <p className="text-xl font-bold mb-2">
                  Total Price: ${totalPrice}
                </p>

                <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded w-full md:w-auto">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
