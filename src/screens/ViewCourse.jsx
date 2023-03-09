import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminCourseView } from "../components/viewCourseAdmin/AdminCourseView";
import { StudentCourseView } from "../components/viewCourseStudent/StudentCourseView";
import { TeacherCourseView } from "../components/viewCourseTeacher/TeacherCourseView";
import AuthContext from "../context/AuthContext";
import useHttp from "../services/useHttp";

export const ViewCourse = () => {
  const [course, setCourse] = useState({});
  const http = useHttp();
  const location = useLocation();
  const index = location.state.courseId;
  const {user}=useContext(AuthContext);
  // if (!user || user.role[0]!=="ADMIN")


  const getdata = async () => {
    console.log(index);
    const { data } = await http.get("/getcoursebyid/" + String(index));
    setCourse(data);
    console.log(data);
    return data;
  };

  const getOtherData=()=>{
    if(user && user.role[0]==="ADMIN"){
      return <AdminCourseView course={course}/>
    }
    else if(user && user.role[0]==="TEACHER"){
      return <TeacherCourseView course={course}/>
    }
    else if(user && user.role[0]==="STUDENT"){
      return <StudentCourseView course={course}/>
    }

  }

  useEffect(() => {
    setCourse(getdata());
  }, []);

  return (
    <>
      <div className="outside-form-container">
        <div className="form-container">
          <h1>View Course</h1>
          <div className="inside-form-container">
          <label htmlFor="courseName">Course Name</label>
            <br />
            <input
              readOnly
              value={course.courseName || ""}
              type="text"
              id="courseName"
              name="courseName"
            />
            <br />

            <label htmlFor="moduleCode">Module Code</label>
            <br />
            <input
              readOnly
              value={course.moduleCode || ""}
              type="text"
              id="moduleCode"
              name="moduleCode"
            />
            <br />

            <label htmlFor="fee">Fee</label>
            <br />
            <input
              readOnly
              value={course.fee || ""}
              type="text"
              id="fee"
              name="fee"
            />
            <br />

            <label htmlFor="fee">Start Date</label>
            <br />
            <input
              readOnly
              value={course.startDate || ""}
              type="text"
              id="startDate"
              name="startDate"
            />
            <br />

            {getOtherData()}
          </div>
        </div>
      </div>
    </>
  );
};
