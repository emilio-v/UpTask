import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    msg: "",
    error: false,
  });

  // const { setAuth } = useAuth();

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post("/users/login", {
        email,
        password,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setUser({
        email: "",
        password: "",
      });
      localStorage.setItem("token", data.token);
    } catch (error) {
      const { data } = error.response;
      setAlert({
        msg: data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Login and manage your <span className="text-slate-700">projects</span>
      </h1>

      {alert.msg && <Alert alert={alert} />}

      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={submit}>
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
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/sign-up"
        >
          Don't have an account yet? Register now
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

export default Login;
