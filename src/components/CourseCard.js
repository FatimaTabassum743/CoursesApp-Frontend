import React from "react";

const CourseCard = ({ course, canEdit, onEdit, onDelete }) => {
  const handleOpenLink = () => {
    window.open(course.link, "_blank", "noopener,noreferrer");
  };

  const date = new Date(course.createdAt);

  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3 className="course-title">{course.name}</h3>
        {canEdit && (
          <div className="course-card-actions">
            <button className="icon-btn" onClick={() => onEdit(course)}>
              ✏️
            </button>
            <button className="icon-btn danger" onClick={() => onDelete(course)}>
              🗑
            </button>
          </div>
        )}
      </div>
      <p className="course-description">{course.description}</p>
      <div className="course-meta">
        <div className="course-teacher">
          <span className="course-teacher-name">{course.teacherName}</span>
          <span className="course-teacher-details">{course.teacherDetails}</span>
        </div>
        <span className="course-date">
          {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      <button className="btn secondary full" onClick={handleOpenLink}>
        Open Course
      </button>
    </div>
  );
};

export default CourseCard;


