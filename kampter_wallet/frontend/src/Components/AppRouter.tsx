import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Main from "../Pages/Main";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;