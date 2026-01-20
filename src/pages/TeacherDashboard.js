import React, { useState } from "react";
import { useCourses } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import CourseFormModal from "../components/CourseFormModal";
import ConfirmModal from "../components/ConfirmModal";

const TeacherDashboard = () => {
  const { courses, loading, search, setSearch, addCourse, updateCourse, deleteCourse } =
    useCourses();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const handleAddClick = () => {
    setEditingCourse(null);
    setIsFormOpen(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsFormOpen(true);
  };

  const handleDeleteRequest = (course) => {
    setConfirmTarget(course);
  };

  const handleConfirmDelete = async () => {
    if (!confirmTarget) return;
    await deleteCourse(confirmTarget._id);
    setConfirmTarget(null);
  };

  const handleSubmitCourse = async (form) => {
    if (editingCourse) {
      await updateCourse(editingCourse._id, form);
    } else {
      await addCourse(form);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Teacher Dashboard</h1>
          <p className="page-subtitle">
            Manage your courses. Changes are visible to students instantly.
          </p>
        </div>
        <div className="page-actions">
          <input
            className="text-input"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn primary" onClick={handleAddClick}>
            + Add Course
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loader">Loading courses...</div>
      ) : courses.length === 0 ? (
        <p className="empty-state">No courses yet. Add your first course.</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              canEdit
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      <CourseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitCourse}
        initialCourse={editingCourse}
      />

      <ConfirmModal
        isOpen={!!confirmTarget}
        title="Delete course?"
        message={
          confirmTarget
            ? `Are you sure you want to delete "${confirmTarget.name}"? This cannot be undone.`
            : ""
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
};

export default TeacherDashboard;


