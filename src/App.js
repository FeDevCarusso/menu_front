import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import MyNav from "./Components/Nav/Nav";
import Cart from "./Pages/Cart/Cart";
import Index from "./Pages/Index/Index";
import MyOrder from "./Pages/MyOrder/MyOrder";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./Pages/Login/Login";
import RestaurantProvider from "./context/RestaurantContext";
import { GlobalStorageContext } from "./context/GlobalStorage";

function App() {
  const { isChecked, isAuth } = useContext(AuthContext);
  const { restaurantCode } = useContext(GlobalStorageContext);

  return !isChecked ? null : (
    <div className="App">
      {isAuth && <MyNav />}
      {!isAuth ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Index />} />
          <Route
            path="/restaurant/:code"
            element={
              <RestaurantProvider>
                <Home />
              </RestaurantProvider>
            }
          />
          <Route
            path="/restaurant/"
            element={
              <Navigate
                to={!restaurantCode ? "/restaurant/notFound" : `/restaurant/${restaurantCode}`}
              />
            }
          />
          <Route path="/cart/:code" element={<Cart />} />
          <Route path="/my_order/:code" element={<MyOrder />} />
          <Route
            path="/my_order"
            element={
              <Navigate
                to={!restaurantCode ? "/restaurant/notFound" : `/my_order/${restaurantCode}`}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
