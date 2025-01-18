import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import NaviBar from "./components/navi-bar";
import Footer from "./components/footer";

function App() {
  return (    
    <Router>
      <div className="bg-background min-h-screen flex flex-col">
        <NaviBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Default route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;