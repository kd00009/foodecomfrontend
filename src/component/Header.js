import React from "react";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const productCartItems = useSelector((state) => state.product.cartItem);
  const dispatch = useDispatch();

  const [showmenu, setShowMenu] = React.useState(false);
  const userdata = useSelector((state) => state);
  const handlelogout = () => {
    dispatch(logoutRedux());
    toast.success(`${userdata.user.firstName} logged out`);
  };

  return (
    <header className="App bg-emerald-500 fixed shadow-md w-full h-10 z-10">
      <div className="flex items-center justify-between  h-full ">
        <div className="w-20 h-10 px-2 ">
          <Link to="/">
            <img src={logo} alt="logo" className="w-full h-full" />
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-4 ">
          <nav className="flex items-center gap-5 md:gap-6 justify-center md:text-lg hidden md:flex">
            <Link to="/">Home</Link>
            <Link to={"menu/6496086c7d41fb69f8b93eb3"}>Menu</Link>
          </nav>
          <div
            className="text-xl text-slate-600 border-slate-600 border-2 border-solid p-1 rounded-full relative cursor-pointer "
            onClick={() => setShowMenu(!showmenu)}
          >
            {userdata.user.image && userdata.user.image !== "" ? (
              <img
                src={userdata.user.image}
                alt=""
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <FaUserAlt />
            )}

            {showmenu && (
              <div className="absolute -right-8 top-10 bg-red-500 rounded-full text-white text-lg   p-2  shadow drop-shadow-md shadow-slate-600  ">
                <div>
                  {process.env.REACT_APP_ADMIN_EMAIL ===
                    userdata.user.email && (
                    <Link to={"newproduct"} className="whitespace-nowrap">
                      new product
                    </Link>
                  )}
                </div>
                {userdata.user.image && userdata.user.image !== "" ? (
                  <p className="whitespace-nowrap " onClick={handlelogout}>
                    Logout{` ${userdata.user.firstName}`}
                  </p>
                ) : (
                  <Link
                    to="login"
                    className="whitespace-nowrap hidden md:block"
                  >
                    Login
                  </Link>
                )}
                <nav className="flex flex-col justify-center items-center gap-5 md:gap-6  md:text-lg  md:hidden">
                  <Link to="/login">Login</Link>
                  <Link to="/">Home</Link>
                  <Link to={"/menu"}>menu</Link>
                  <Link to="/contact">contact</Link>
                  <Link to="/about">ABOUT</Link>
                </nav>
              </div>
            )}
          </div>
          <div className=" text-2xl relative pr-2">
            <Link to="cart">
              <BsCartFill />
              <div className=" absolute left-3  right-0 h-4 w-5 flex items-center justify-center bg-red-500 rounded-full text-white text-lg bottom-4  ">
                {productCartItems.length}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
