import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({
    msg: "",
    error: false,
  });

  const { name, email, password, confirmPassword } = user;

  const onChage = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if ([name, email, password, confirmPassword].includes("")) {
      setAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        msg: "Passwords are not equals",
        error: true,
      });
    }

    if (password.length < 8) {
      setAlert({
        msg: "Make sure you have at least 8 characters",
        error: true,
      });
    }

    setAlert({ msg: "", error: false });
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Create your account and manage your{" "}
        <span className="text-slate-700">projects</span>
      </h1>

      {alert.msg && <Alert alert={alert} />}

      <form onSubmit={submit} className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={onChage}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={onChage}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={onChage}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={confirmPassword}
            onChange={onChage}
          />
        </div>
        <input
          type="submit"
          value="Create account"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Already have an account? Login
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forgot-password"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
};

export default SignUp;
