import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

const ResetPassword = () => {
  const { token } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [modifiedPassword, setModifiedPassword] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    error: false,
  });

  const validateToken = async () => {
    try {
      await axiosClient(`/users/reset-password/${token}`);
      setValidToken(true);
    } catch (error) {
      const { data } = error.response;
      setAlert({
        msg: data.msg,
        error: true,
      });
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setAlert({
        msg: "Make sure you have at least 8 characters",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(
        `/users/reset-password/${token}`,
        { password }
      );
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPassword("");
      setModifiedPassword(true);
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
        Reset your <span className="text-slate-700">password</span> and don't
        lose access to your <span className="text-slate-700">projects</span>
      </h1>

      {alert.msg && <Alert alert={alert} />}

      {validToken && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={submit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your new password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Save new password"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

      {modifiedPassword && (
        <Link
          className="block font-bold text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default ResetPassword;
