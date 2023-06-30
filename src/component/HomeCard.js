import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ name, price, image, category, loading, id }) => {
  return (
    <>
      <Link to={"/menu/" + id + ""}>
        <div className="bg-white p-4 shadow-lg rounded max-w-[200px] align-items-center min-w-[200px]">
          {name ? (
            <>
              <div className="min-h-[170px]">
                <img className="w-full text-center" src={image} alt="" />
              </div>
              <h1 className="text-lg font-bold text-center capitalize">
                {name}
              </h1>
              <p className="text-center text-slate-500 font-medium">
                {category}
              </p>
              <p className="text-center text-slate-500 font-medium">
                rs{price}
              </p>
            </>
          ) : (
            <p>{loading}</p>
          )}
        </div>
      </Link>
    </>
  );
};

export default HomeCard;
