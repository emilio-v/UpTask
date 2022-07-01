import React, { useState } from "react";
import useProjects from "../hooks/useProjects";

import Alert from "../components/Alert";

const ProjectForm = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    deliveryDate: "",
    client: "",
  });

  const { alert, displayAlert, submitProject } = useProjects();

  const { name, description, deliveryDate, client } = project;

  const onChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deliveryDate, client].includes("")) {
      displayAlert({
        msg: "All fields are required",
        error: true,
        duration: 5000,
      });
      return;
    }

    await submitProject(project);

    setProject({
      client: "",
      deliveryDate: "",
      description: "",
      name: "",
    });
  };

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={onSubmit}
    >
      {alert.msg && <Alert alert={alert} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Project Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Project Name"
          value={name}
          onChange={onChange}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Description"
          value={description}
          onChange={onChange}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="deliveryDate"
        >
          Delivery Date
        </label>
        <input
          id="deliveryDate"
          name="deliveryDate"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={deliveryDate}
          onChange={onChange}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="client"
        >
          Client
        </label>
        <input
          id="client"
          name="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Client"
          value={client}
          onChange={onChange}
        />
      </div>

      <input
        type="submit"
        value="Create Project"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default ProjectForm;
