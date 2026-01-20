import React, { useState } from "react";
import { useRole } from "../context/RoleContext";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";

const RoleModal = () => {
  const { role, hasChosenRole, chooseRole } = useRole();
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { showError, showSuccess } = useToast();

  const handleStudent = () => {
    chooseRole("student");
  };

  const handleTeacherClick = () => {
    setShowPasswordField(true);
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      showError("Please enter password");
      return;
    }
    try {
      setSubmitting(true);
      await api.post("/auth/teacher-login", { password });
      chooseRole("teacher");
      showSuccess("Welcome, Teacher");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid password";
      showError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (hasChosenRole && role) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2 className="modal-title">Choose your role</h2>
        <p className="modal-subtitle">
          Select how you want to use the LMS.
        </p>
        <div className="modal-role-buttons">
          <button className="btn primary" onClick={handleStudent}>
            🎓 Student
          </button>
          <button className="btn outline" onClick={handleTeacherClick}>
            👩‍🏫 Teacher
          </button>
        </div>
        {showPasswordField && (
          <form onSubmit={handleTeacherSubmit} className="modal-password-form">
            <label className="field-label">Teacher Password</label>
            <input
              type="password"
              className="text-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter teacher password"
            />
            <button className="btn primary full" type="submit" disabled={submitting}>
              {submitting ? "Validating..." : "Continue as Teacher"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RoleModal;


