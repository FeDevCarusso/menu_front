import { Route, Routes } from "react-router-dom";
import MyNav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Restaurant from "./pages/Restaurant/Restaurant";
import FoundRestaurants from "./pages/FoundRestaurants/FoundRestaurants";

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

      </Routes>
    </div>
  );
}

export default App;
