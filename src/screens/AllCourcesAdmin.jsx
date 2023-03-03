import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../services/useHttp";

export const AllCourcesAdmin = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const http = useHttp();

  const getdata = async () => {
    const { data } = await http.get("/getallcources");
    const data2 = Array.from(data);
    setCourses(data2);
    //console.log("asdf",users)
  };
  const sortCources = (column) => {
    var courses2 = [...courses];
    if (column === 0) {
      courses2.sort((a, b) => a[0] - b[0]);
      setCourses(courses2);
      return;
    } else {
        courses2.sort((a, b) => {
        const valueA = a[column].toUpperCase(); // ignore upper and lowercase
        const valueB = b[column].toUpperCase(); // ignore upper and lowercase
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
      setCourses(courses2);
      return;
    }
  };

  const enableCourse = async (index) => {
    const { data } = await http.get("/enablecourse/" + String(index));
    if (data !== null) {
        setCourses(
            courses.map((item) =>
          item[0] === data.courseId
            ? { ...[data.courseId, data.courseName, data.moduleCode, data.enabled] }
            : item
        )
      );
    }
    console.log(data);
  };
  const disableCourse = async (index) => {
    const { data } = await http.get("/disablecourse/" + String(index));
    if (data !== null) {
        setCourses(
            courses.map((item) =>
          item[0] === data.courseId
            ? { ...[data.courseId, data.courseName, data.moduleCode, data.enabled] }
            : item
        )
      );
      // users.findIndex(obj => obj[0] === data.id)
    }
    // console.log(data)
  };
  const deleteCourse = async (index) => {
    const { data } = await http.get("/deletecourse/" + String(index));
    if (data !== null) {
        setCourses(courses.filter((item) => item[0] !== data.courseId));
      // users.findIndex(obj => obj[0] === data.id)
    }
  };
  const navigateUser = (index) => {
    console.log(index);
    navigate("/ViewCourse", { state: { id: index } });
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div className="outside-form-container">
        <div className="form-container">
          <h1>All Cources</h1>
          <button
            onClick={() => navigate("/AddNewCourse")}
            type="button"
            className="btn btn-outline-dark"
          >
            + Add a new Course
          </button>

          <table className="table ">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => sortCources(0)}
                  >
                    Sort Index
                  </button>
                </th>
                <th scope="col">
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => sortCources(1)}
                  >
                    Sort course name
                  </button>
                </th>
                <th scope="col">
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => sortCources(2)}
                  >
                    Sort module code
                  </button>
                </th>
                <th scope="col"></th>
              </tr>
              <tr style={{ textAlign: "right" }}>
                <h3>Enabled Courses</h3>
              </tr>
              <tr>
                <th scope="col"></th>
                <th scope="col">Index</th>
                <th scope="col">Course name</th>
                <th scope="col">Module code</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item) =>
                Boolean(item[3]) ? (
                  <tr key={item[0]}>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        // onClick={() => navigateUser(item[0])}//change
                      >
                        View
                      </button>
                    </td>
                    <td key={item[0].uniqueId}>{item[0]}</td>
                    <td key={item[1].uniqueId}>{item[1]}</td>
                    <td key={item[2].uniqueId}>{item[2]}</td>
                    <td key={item[3].uniqueId}>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => disableCourse(item[0])}
                      >
                        Disable
                      </button>
                    </td>
                  </tr>
                ) : (
                  <></>
                )
              )}
            </tbody>
            <thead>
              <tr style={{ textAlign: "right" }}>
                <h3>Disabled Courses</h3>
              </tr>
              <tr>
                <th scope="col"></th>
                <th scope="col">Index</th>
                <th scope="col">Course name</th>
                <th scope="col">Module code</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item) =>
                !Boolean(item[3]) ? (
                  <tr key={item[0]}>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        // onClick={() => navigateUser(item[0])}
                      >
                        View
                      </button>
                    </td>
                    <td key={item[0].uniqueId}>{item[0]}</td>
                    <td key={item[1].uniqueId}>{item[1]}</td>
                    <td key={item[2].uniqueId}>{item[2]}</td>
                    <td key={item[3].uniqueId}>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => enableCourse(item[0])}
                      >
                        Enable
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => deleteCourse(item[0])}
                      >
                        Deleate
                      </button>
                    </td>
                  </tr>
                ) : (
                  <></>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
