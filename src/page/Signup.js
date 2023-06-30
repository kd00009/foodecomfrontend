import React from "react";
import loginsignup from "../assest/login-animation.gif";
import ImageToBase64 from "../utility/ImageToBase64";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const [Data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
  });
  console.log(Data);
  const handleOnChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleUpload = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);
    setData({ ...Data, image: data });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmpassword } = Data;
    if (firstName && lastName && email && password && confirmpassword) {
      if (password === confirmpassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Data),
          }
        );
        const dataRes = await fetchData.json();
        console.log(dataRes);
        // alert(dataRes.message);
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate("/login");
        }
      } else {
        alert("Password does not match");
      }
    }
  };
  return (
    <div className="px-4 py-4 mx-auto ">
      <div className="w-full max-w-sm m-auto text-center text-2xl flex justify-center p-6 flex-col items-center ">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative">
          <img
            className="max-w-full h-full"
            src={Data.image ? Data.image : loginsignup}
            alt=""
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 right-0 h-1/3  w-full text-center ">
              {Data.image ? (
                <p className="text-sm p-1 hidden  text-black cursor-pointer "></p>
              ) : (
                <p className="text-sm p-1  text-black cursor-pointer ">
                  upload{" "}
                </p>
              )}
            </div>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
        <form onSubmit={handleOnSubmit}>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First name
          </label>
          <input
            onChange={handleOnChange}
            value={Data.firstName}
            name="firstName"
            type="text"
            id="firstName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-1 shadow-slate-600 focus-within:outline-red-500"
          />
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            onChange={handleOnChange}
            value={Data.lastName}
            name="lastName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-1 shadow-slate-600"
          />
          <label
            htmlFor="email"
            className=" block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            onChange={handleOnChange}
            value={Data.email}
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-1 shadow-slate-600"
          />
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="flex items-center mt-1  w-full rounded-md  shadow-sm   sm:text-sm ml-1 shadow-slate-600  focus-within:outline-red-500">
            <input
              type="password"
              value={Data.password}
              onChange={handleOnChange}
              name="password"
              id="password"
              className="outline-none flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <label
            htmlFor="confirmpassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="flex items-center mt-1  w-full rounded-md  shadow-sm   sm:text-sm ml-1 shadow-slate-600  ">
            <input
              value={Data.confirmpassword}
              onChange={handleOnChange}
              name="confirmpassword"
              type="password"
              id="confirmpassword"
              className="outline-1 flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {" "}
            Sign up
          </button>
        </form>
        <p className="text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 underline ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
