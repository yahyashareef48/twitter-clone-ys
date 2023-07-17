import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <nav>
        
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
