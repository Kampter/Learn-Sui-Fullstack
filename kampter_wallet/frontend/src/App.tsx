import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  return (    
    <Router>
      <div className="bg-background min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} /> {/* Default route */}
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;