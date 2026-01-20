import React, { useEffect, useState } from "react";

const initialState = {
  name: "",
  description: "",
  link: "",
  teacherName: "",
  teacherDetails: ""
};

const CourseFormModal = ({ isOpen, onClose, onSubmit, initialCourse }) => {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialCourse) {
      setForm({
        name: initialCourse.name || "",
        description: initialCourse.description || "",
        link: initialCourse.link || "",
        teacherName: initialCourse.teacherName || "",
        teacherDetails: initialCourse.teacherDetails || ""
      });
    } else {
      setForm(initialState);
    }
  }, [initialCourse]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2 className="modal-title">
          {initialCourse ? "Edit Course" : "Add Course"}
        </h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="field-label">Course Name</label>
          <input
            className="text-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label className="field-label">Course Description</label>
          <textarea
            className="text-input"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
          />

          <label className="field-label">Course Link</label>
          <input
            className="text-input"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="YouTube / Drive / Website URL"
            required
          />

          <label className="field-label">Teacher Name</label>
          <input
            className="text-input"
            name="teacherName"
            value={form.teacherName}
            onChange={handleChange}
            required
          />

          <label className="field-label">Teacher Qualification / Details</label>
          <input
            className="text-input"
            name="teacherDetails"
            value={form.teacherDetails}
            onChange={handleChange}
            required
          />

          <div className="modal-actions-row">
            <button type="button" className="btn outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;


