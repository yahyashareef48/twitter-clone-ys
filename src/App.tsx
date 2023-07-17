import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
        <div className="flex mx-auto">
          <header>
            <Navbar />
          </header>
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </div>
  );
}

export default App;
