import React from "react";
import { useRole } from "../context/RoleContext";

const Header = () => {
  const { role } = useRole();

  return (
    <header className="app-header">
      <div className="app-header-left">
        <span className="logo-mark">LMS</span>
        <span className="logo-text">Learning Platform</span>
      </div>
      <div className="app-header-right">
        {role && (
          <span className="role-pill">
            {role === "teacher" ? "Teacher" : "Student"}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;


