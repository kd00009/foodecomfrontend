import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import ImageToBase64 from "../utility/ImageToBase64";
import { toast } from "react-hot-toast";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category: "",
  });

  const handleUpload = async (e) => {
    try {
      const base64Data = await ImageToBase64(e.target.files[0]);
      setData({ ...data, image: base64Data });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      // Handle the error appropriately (e.g., display an error message)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, description, price, category } = data;
    if (name && image && description && price && category) {
      const fetchdata = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const fetchres = await fetchdata.json();
      toast.success(fetchres.message);
      setData({
        name: "",
        image: "",
        description: "",
        price: "",
        category: "",
      });
      console.log(fetchres);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <div className="m-auto w-full max-w-md">
        <form
          className="m-auto w-full max-w-md shadow shadow-slate-600 flex flex-col p-3 bg-white"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            onChange={handleInputChange}
            id="name"
            type="text"
            name="name"
            value={data.name}
            className="shadow-slate-600 bg-slate-400 p-1 my-1"
          />

          <label htmlFor="category">Category</label>
          <select
            className="shadow-slate-300 bg-slate-300 p-1 my-1"
            name="category"
            onChange={handleInputChange}
            value={data.category}
            defaultValue="" // Set defaultValue to an empty string
          >
            <option disabled value="">
              Select category
            </option>{" "}
            {/* Display a placeholder */}
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="icecreams">Ice Creams</option>
            <option value="dosa">Dosa</option>
            <option value="pizza">Pizza</option>
            <option value="rice">rice</option>
            <option value={"cakes"}>Cake</option>
            <option value={"burger"}>Burger</option>
            <option value={"paneer"}>Panner</option>
          </select>

          <label htmlFor="image" className="my-1">
            Image
            <div className="h-40 w-full bg-slate-300 my-3 rounded flex items-center justify-center">
              {data.image ? (
                <img
                  src={data.image}
                  alt=""
                  className="h-full cursor-pointer"
                  onClick={() => document.getElementById("imageInput").click()}
                />
              ) : (
                <span className="text-5xl">
                  <BsCloudUpload
                    className="cursor-pointer"
                    onClick={() =>
                      document.getElementById("imageInput").click()
                    }
                  />
                </span>
              )}

              <input
                type="file"
                accept="*/*"
                onChange={handleUpload}
                className="hidden"
                id="imageInput"
                name="image"
              />
            </div>
          </label>

          <label htmlFor="price" className="my-1">
            Price
          </label>
          <input
            value={data.price}
            onChange={handleInputChange}
            type="text"
            name="price"
            id="price"
            className="shadow-slate-600 bg-slate-400 p-1 my-1"
          />

          <label htmlFor="description" className="my-1">
            Description
          </label>
          <textarea
            value={data.description}
            onChange={handleInputChange}
            rows={2}
            name="description"
            id="description"
            className="shadow-slate-600 bg-slate-400 p-1 my-1 resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add Product
          </button>
        </form>
      </div>
    </main>
  );
};

export default Newproduct;
