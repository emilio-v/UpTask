import { useEffect, useCallback, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const { token } = useParams();
  const [alert, setAlert] = useState({
    msg: "",
    error: false,
  });
  const [confirmedAccount, setConfirmedAccount] = useState(false);

  const confirmAccount = useCallback(async () => {
    try {
      const url = `/users/confirm/${token}`;
      const { data } = await axiosClient(url);
      setAlert({
        msg: data.msg,
        error: false,
      });
      setConfirmedAccount(true);
    } catch (error) {
      const { data } = error.response;
      setAlert({
        msg: data.msg,
        error: true,
      });
    }
  }, []);

  useEffect(() => {
    confirmAccount();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirm your <span className="text-slate-700">account</span> and start
        creating your <span className="text-slate-700">projects</span>
      </h1>
      {alert.msg && <Alert alert={alert} />}
      {confirmedAccount && (
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

export default ConfirmAccount;
