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
import { ViewCourse } from "./screens/ViewCourse";
import { Cources } from "./screens/Courses";
import { ViewTeachersAdmin } from "./components/viewCourseAdmin/ViewTeachersAdmin";
import { ViewStudentsAdmin } from "./components/viewCourseAdmin/ViewStudentsAdmin";
import AdminTeacherRoute from "./protectedRouts/AdminTeacherRoute";
import { ViewCoursesAdmin } from "./components/viewUserAdmin/ViewCourcesAdmin";
import TeacherRoute from "./protectedRouts/TeacherRoute";
import { ViewCoursesTeacher } from "./components/ViewUserTeacher.jsx/ViewCoursesTeacher";
import { MyCourses } from "./screens/MyCourses";

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

            <Route path="/Courses" element={<Cources />} />

            <Route
              path="/userDetails"
              element={
                <AuthenticatedRoute>
                  <UserDetails />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/viewteachers"
              element={
                <AdminRoute>
                  <ViewTeachersAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="/viewstudents"
              element={
                <AdminRoute>
                  <ViewStudentsAdmin />
                </AdminRoute>
              }
            />

            <Route
              path="/ViewCourse"
              element={
                <AuthenticatedRoute>
                  <ViewCourse />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/mycourses"
              element={
                <AuthenticatedRoute>
                  <MyCourses />
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
                <AdminTeacherRoute>
                  <ViewUser />
                </AdminTeacherRoute>
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
              path="/viewcourses"
              element={
                <AdminRoute>
                  <ViewCoursesAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="/viewcoursesAsteacher"
              element={
                <TeacherRoute>
                  <ViewCoursesTeacher />
                </TeacherRoute>
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
