import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();
  const handleAddCartProduct = () => {
    dispatch(
      addCartItem({
        image,
        name,
        price,
        category,
        id,
      })
    );
  };
  return (
    <div className="bg-white w-full min-w-[200px] drop-shadow-lg py-5 hover:shadow-2xl cursor-pointer max-w-[200px]">
      {image ? (
        <Link to={"/menu/" + id} className="block w-full h-28">
          <div className="h-28 flex justify-center">
            <img
              className="h-full text-center"
              src={image}
              alt=""
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </div>
        </Link>
      ) : (
        <div className="h-25 flex justify-center">
          {loading ? <div>Loading...</div> : null}
        </div>
      )}
      <div className="flex flex-col justify-center h-28">
        <h3 className="text-lg font-bold text-center capitalize mt-4 sm:text-sm">
          {name}
        </h3>
        <p className="text-center text-slate-500 font-medium sm:text-sm">
          {category}
        </p>
        <p className="text-center text-slate-500 font-medium sm:text-sm">
          rs{price}
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full mt-2 whitespace-nowrap"
          onClick={handleAddCartProduct}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CardFeature;
