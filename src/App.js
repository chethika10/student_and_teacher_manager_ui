import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./css/Forms.css";

import { AuthProvider } from "./context/AuthContext";
import { Register } from "./screens/Register";
import { LogIN } from "./screens/LogIN";
import { Home } from "./screens/Home";
import { AboutUs } from "./screens/AboutUs";
import { NavBar } from "./components/NavBar";
import { UserDetails } from "./screens/UserDetails";
import AuthenticatedRoute from "./protectedRouts/AuthenticatedRoute";
import { AllUsers } from "./screens/AllUsers";
import AdminRoute from "./protectedRouts/AdminRoute";
import { ViewUser } from "./screens/ViewUser";
import { AllCourcesAdmin } from "./screens/AllCourcesAdmin";
import { AddNewCourse } from "./screens/AddNewCourse";

function App() {
  const pageTitle = `${"S&TManager"}`;
  document.title = pageTitle;
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <header>
            <NavBar />
          </header>

          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/LogIN" element={<LogIN />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />

            <Route
              path="/userDetails"
              element={
                <AuthenticatedRoute>
                  <UserDetails />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/AllUsers"
              element={
                <AdminRoute>
                  <AllUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/ViewUser"
              element={
                <AdminRoute>
                  <ViewUser />
                </AdminRoute>
              }
            />
            <Route
              path="/AllCourcesAdmin"
              element={
                <AdminRoute>
                  <AllCourcesAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="/AddNewCourse"
              element={
                <AdminRoute>
                  <AddNewCourse />
                </AdminRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
