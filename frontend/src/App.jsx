import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmAccount from "./pages/ConfirmAccount";

import ProtectedRoute from "./layouts/ProtectedRoute";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route
                path="forgot-password/:token"
                element={<ResetPassword />}
              />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
            </Route>

            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="new-project" element={<NewProject />} />
              <Route path=":id" element={<Project />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
