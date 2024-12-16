import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./routes/Homepage";
import Login from "./routes/Auth/Login";

// User
import UserHome from "./routes/User/UserMainpage/UserHome";
import UserAbout from "./routes/User/UserMainpage/UserAbout";
import UserMenu from "./routes/User/UserMenu/UserMenu";
import UserContact from "./routes/User/UserMainpage/UserContact";
import UserLayout from "./routes/User/UserLayout";

// Admin
import AdminLayout from "./routes/Admin/AdminLayout";
import AdminDashboard from "./routes/Admin/AdminDashboard/AdminDashboard";
import AdminMenu from "./routes/Admin/AdminMenu/AdminMenu";
import AdminHome from "./routes/Admin/AdminHome/AdminHome";
import AdminFoodTrack from "./routes/Admin/AdminFoodTrack/AdminFoodTrack";
import Checkout from "./routes/User/UserCheckout/Checkout";
import AddTable from "./components/AddTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {/* Authentication */}
      <Route path="/auth/login" element={<Login />} />

      <Route path="add-table" element={<AddTable />} />
      {/*User Main page*/}
      {/* <Route element={<AuthWrapper />}> */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="home" element={<UserHome />} />
        <Route path="about" element={<UserAbout />} />
        <Route path="menu" element={<UserMenu />} />
        <Route path="contact" element={<UserContact />} />
      </Route>
      <Route path="checkout" element={<Checkout />} />
      {/* </Route> */}

      {/* Admin  */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="home" element={<AdminHome />} />
        <Route path="menu" element={<AdminMenu />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="food-track" element={<AdminFoodTrack />} />
      </Route>
    </Routes>
  );
}

export default App;
