import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useHttp from "../../services/useHttp";

export const ViewCoursesAdmin = () => {
  const http = useHttp();
  const [courses, setCourses] = useState([]);
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;

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
  const getdata = async () => {
    const { data } = await http.get("/getcourses/" + String(user.id));
    const data2 = Array.from(data);
    setCourses(data2);
    console.log("asdf", data2);
  };
  const addCourse = async () => {
    var moduleCode = code;
    var userId = user.id;
    var data = { userId, moduleCode };
    const data2 = await http.post("/addcoursetoteacher", data);
    //console.log(data2.data)
    if (data2 && Boolean(data2.data)) {
      alert("Course added");
      getdata();
    } else {
      alert("Course not added");
    }
  };
  const removeCourse = async (mcode) => {
    var moduleCode = mcode;
    var userId = user.id;
    var data = { userId, moduleCode };
    const data2 = await http.post("/removecoursefromteacher", data);
    //console.log(data2.data)
    if (data2 && Boolean(data2.data)) {
      alert("Course removed");
      getdata();
    } else {
      alert("error");
    }
  };
  const navigateUser = (index) => {
    console.log(index);
    navigate("/ViewCourse", { state: { courseId: index } });
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="outside-form-container">
      <div className="form-container">
        <h1>All Courses for {user.userName}</h1>

        <table className="table ">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => sortCources(1)}
                >
                  Sort Name
                </button>
              </th>
              <th scope="col">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => sortCources(2)}
                >
                  Sort Module Code
                </button>
              </th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Module Code</th>
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
                      onClick={() => navigateUser(item[0])}
                    >
                      View
                    </button>
                  </td>

                  <td key={item[1].uniqueId}>{item[1]}</td>
                  <td key={item[2].uniqueId}>{item[2]}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeCourse(item[2])}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ) : (
                <></>
              )
            )}
            {user.role === "TEACHER" && (
              <tr>
                <td>+ Add course</td>
                <td>
                  <div className="input-group mb-3">
                    <button
                      className="btn btn-outline-dark"
                      type="button"
                      id="button-addon1"
                      onClick={() => addCourse()}
                    >
                      Add course
                    </button>
                    <input
                      type="text"
                      value={code}
                      className="form-control"
                      placeholder="Module Code"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
};
