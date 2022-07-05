import React from "react";
import useProjects from "../hooks/useProjects";
import ProjectPreview from "../components/ProjectPreview";

const Projects = () => {
  const { projects } = useProjects();
  return (
    <>
      <h1 className="text-4xl font-black">Projects</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {!!projects.length ? (
          projects.map((project) => (
            <ProjectPreview project={project} key={project._id} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            There is not Projects yet.
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
