import AllRoutes from "./routes/AllRoutes";
import "./App.css";
import Header from "./component/Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/product`
        );
        const data = await response.json();
        // Handle the retrieved data here
        console.log(data);
        dispatch(setDataProduct(data));
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main>
          <AllRoutes />
        </main>
      </div>
    </>
  );
}

export default App;
