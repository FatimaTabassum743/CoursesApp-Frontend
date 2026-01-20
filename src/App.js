import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import RoleModal from "./components/RoleModal";
import Header from "./components/Header";
import { useRole } from "./context/RoleContext";
import ToastContainer from "./components/ToastContainer";

const AppContent = () => {
  const { role, hasChosenRole } = useRole();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (hasChosenRole) {
      if (role === "student") navigate("/student");
      if (role === "teacher") navigate("/teacher");
    }
  }, [hasChosenRole, role, navigate]);

  return (
    <div className="app-root">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <RoleModal />
      <ToastContainer />
    </div>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;


