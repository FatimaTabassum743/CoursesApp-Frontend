import React from "react";
import { useCourses } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";

const StudentDashboard = () => {
  const { courses, loading, search, setSearch } = useCourses();

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Courses</h1>
          <p className="page-subtitle">
            Browse available learning resources shared by teachers.
          </p>
        </div>
        <div className="page-actions">
          <input
            className="text-input"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loader">Loading courses...</div>
      ) : courses.length === 0 ? (
        <p className="empty-state">No courses yet. Check back soon!</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} canEdit={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;


