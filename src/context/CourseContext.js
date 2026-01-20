import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useToast } from "./ToastContext";

const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { showSuccess, showError } = useToast();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      showError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (payload) => {
    try {
      const res = await api.post("/courses", payload);
      setCourses((prev) => [res.data, ...prev]);
      showSuccess("Course added");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to add course";
      showError(msg);
      throw err;
    }
  };

  const updateCourse = async (id, payload) => {
    try {
      const res = await api.put(`/courses/${id}`, payload);
      setCourses((prev) => prev.map((c) => (c._id === id ? res.data : c)));
      showSuccess("Course updated");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to update course";
      showError(msg);
      throw err;
    }
  };

  const deleteCourse = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c._id !== id));
      showSuccess("Course deleted");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to delete course";
      showError(msg);
      throw err;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CourseContext.Provider
      value={{
        courses: filteredCourses,
        rawCourses: courses,
        loading,
        search,
        setSearch,
        fetchCourses,
        addCourse,
        updateCourse,
        deleteCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourses must be used within CourseProvider");
  return ctx;
};


