import { Route, Routes } from "react-router-dom";
import MyNav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Restaurant from "./pages/Restaurant/Restaurant";
import FoundRestaurants from "./pages/FoundRestaurants/FoundRestaurants";
import RestaurantPanel from "./pages/RestaurantPanel/RestaurantPanel";
import AddCat from "./pages/AddCategory/AddCat";
import AddFood from "./pages/AddFood/AddFood";

function App() {
  const { isChecked } = useContext(AuthContext)

  return !isChecked ? null : (
    <div className="App">
      <MyNav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/foundRestaurants" element={<FoundRestaurants />} />
        <Route path="/myResto" element={<RestaurantPanel />} />
        <Route path="/myResto/addCat" element={<AddCat />} />
        <Route path="/myResto/addFood" element={<AddFood />} />
      </Routes>
    </div>
  );
}

export default App;
