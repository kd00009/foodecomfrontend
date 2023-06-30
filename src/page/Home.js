import React from "react";
import "./home.css";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

import AllProduct from "../component/AllProduct";

const Home = () => {
  const productdata = useSelector((state) => state.product.products);
  console.log(productdata);
  const homeproductcardlist = productdata.slice(1, 5);
  const homeproductcardlistVegetables = productdata.filter(
    (el) => el.category === "vegetables"
  );
  const loadingarray = new Array(4).fill(1);
  const loadingarrayvegetable = new Array(10).fill(1);
  const Slideproductref = React.useRef();
  const previous = () => {
    Slideproductref.current.scrollLeft -= 300;
  };
  const next = () => {
    Slideproductref.current.scrollLeft += 300;
  };

  return (
    <>
      <div className="p-4 mx-auto md:flex ">
        <div className="md:w-1/2 text-5xl font-extrabold">
          <div className="flex gap-3 bg-slate-300 w-36 rounded text-center px-2">
            <p className="text-sm font-medium text-slate-900">bike delivery</p>

            <img
              className="h-7 remove-background"
              src="https://img.lovepik.com/element/40127/4267.png_1200.png"
              alt=""
            />
          </div>
          <h1>
            fastest delivery to <span className="text-blue-500">your home</span>
          </h1>
          <p className="text-lg py-3 text-slate-500 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            modi odio. Vitae ex nemo repudiandae. A nesciunt ipsum, ab facere
            sunt fugiat minus necessitatibus, cumque provident dolorum quis
            quasi nostrum.
          </p>
          <button className="text-md bg-red-500 text-white btn-primary rounded-md">
            order now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap p-3 gap-2 justify-center">
          {homeproductcardlist[0]
            ? homeproductcardlist.map((el) => (
                <HomeCard
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  key={el._id}
                  id={el._id}
                  category={el.category}
                />
              ))
            : loadingarray.map((el, i) => (
                <HomeCard key={i} loading={"loading..."} />
              ))}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="text-3xl font-extrabold text-slate-700   ">
            fresh vegetables
          </h2>
          <div className="px-8 pt-1 gap-8 flex text-2xl">
            <button
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
              onClick={previous}
            >
              <GrPrevious />
            </button>
            <button
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
              onClick={next}
            >
              <GrNext />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div
          className="flex  gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all mx-auto"
          ref={Slideproductref}
        >
          {homeproductcardlistVegetables[0]
            ? homeproductcardlistVegetables.map((el) => {
                return (
                  <CardFeature
                    name={el.name}
                    category={el.category}
                    image={el.image}
                    price={el.price}
                    key={el._id}
                    id={el._id}
                  />
                );
              })
            : loadingarrayvegetable.map((el, i) => (
                <CardFeature key={i} loading={"loading..."} />
              ))}
        </div>
      </div>
      <AllProduct heading={"All products"} />
    </>
  );
};

export default Home;
