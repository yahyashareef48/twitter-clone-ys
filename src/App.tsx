import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="flex max-w-[1234px] xl:max-w-[1044px] lg:max-w-[660px] mx-auto">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

//TODO: Add error page
