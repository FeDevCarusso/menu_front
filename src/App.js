import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import MyNav from "./Components/Nav/Nav";
import Cart from "./Pages/Cart/Cart";
import Index from "./Pages/Index/Index";
import MyOrder from "./Pages/MyOrder/MyOrder";


function App() {
  return (
    <div className="App">
      <MyNav />
      <Routes>
        <Route index element={<Index />} />
        <Route path="/restaurant" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my_order" element={<MyOrder />} />

      </Routes>
    </div>
  );
}

export default App;
