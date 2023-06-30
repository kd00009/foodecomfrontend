import React from "react";
import loginsignup from "../assest/login-animation.gif";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const [Data, setData] = React.useState({
    email: "",
    password: "",
  });
  console.log(Data);
  const handleOnChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const userdata = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = Data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), // Send only email and password
        }
      );
      const dataRes = await fetchData.json();
      console.log(dataRes);

      if (dataRes.alert) {
        // Login successful
        dispatch(loginRedux(dataRes));
        console.log(userdata.user);
        toast.success(userdata.user.firstName + "" + dataRes.message);
        navigate("/");
        // Redirect to a new page or perform any other necessary actions
      } else {
        // Login failed
        toast.error(dataRes.message);
      }
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="px-4 py-4 mx-auto ">
      <div className="w-full max-w-sm m-auto text-center text-2xl flex justify-center p-6 flex-col items-center ">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img className="max-w-full" src={loginsignup} alt="" />
        </div>
        <form onSubmit={handleOnSubmit}>
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

          <button
            type="submit"
            className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {" "}
            LOG IN
          </button>
        </form>
        <p className="text-lg">
          Dnt have an account?{" "}
          <Link to="/signup" className="text-blue-700 underline ">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
