import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Explore from "./pages/Explore";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="flex max-w-[1234px] xl:max-w-[1044px] lg:max-w-[660px] mx-auto">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:uid" element={user ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

//TODO: Add error page
