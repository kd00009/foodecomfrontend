import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";

const AllProduct = ({ heading }) => {
  const loadingarrayvegetable = new Array(10).fill(1);
  const productdata = useSelector((state) => state.product.products);
  const categorylist = productdata
    .filter(
      (el, index, arr) =>
        arr.findIndex((item) => item.category === el.category) === index
    )
    .map((el) => el.category);
  const [datafilter, setdatafilter] = React.useState([]);

  useEffect(() => {
    setdatafilter(productdata);
  }, [productdata]);

  const handlefilter = (category) => {
    const filter = productdata.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setdatafilter([...filter]);
  };

  return (
    <>
      <div>
        <h2 className="text-3xl font-extrabold text-slate-700 p-4  ">
          {heading}
        </h2>
        <div className="flex gap-2 rounded md:justify-center scrollbar-none overflow-scroll">
          {categorylist[0] ? (
            categorylist.map((el, i) => {
              return (
                <FilterProduct
                  category={el}
                  onClick={() => handlefilter(el)}
                  key={i}
                />
              );
            })
          ) : (
            <div>
              <FilterProduct loading={true} />
            </div>
          )}
        </div>
      </div>
      <div className="flex  flex-wrap justify-center gap-3">
        {datafilter[0]
          ? datafilter.map((el) => {
              return (
                <CardFeature
                  id={el._id}
                  key={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
          : loadingarrayvegetable.map((el, i) => (
              <CardFeature key={i} loading={"loading..."} />
            ))}
      </div>
    </>
  );
};

export default AllProduct;
