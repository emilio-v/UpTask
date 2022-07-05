import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({
    msg: "",
    error: false,
    duration: "never",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  const displayAlert = (alert) => {
    setAlert(alert);

    if (alert.duration !== "never" && typeof alert.duration === "number") {
      setTimeout(() => {
        setAlert({ msg: "", error: false, duration: "never" });
      }, alert.duration);
    }
  };

  const submitProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/projects", project, config);

      setProjects([...projects, data]);

      setAlert({
        error: false,
        msg: "Project created successfully",
      });

      setTimeout(() => {
        setAlert({
          msg: "",
          error: false,
          duration: "never",
        });
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, alert, displayAlert, submitProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
