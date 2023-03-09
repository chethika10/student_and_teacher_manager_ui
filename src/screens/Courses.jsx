import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../services/useHttp";

export const Cources = () => {
  const pageTitle = `${"S&TManager-Courses"}`;
  document.title = pageTitle;
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const http = useHttp();

  const getdata = async () => {
    const { data } = await http.get("/getallcources");
    const data2 = Array.from(data);
    setCourses(data2);
    console.log("asdf", data2);
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
  const isStarted=(started)=>{
    if(started){
      return "Started"
    }else{
      return "Not Started"
    }
  }
  const navigateUser = (index) => {
    console.log(index);
    navigate("/ViewCourse", { state: { courseId: index } });
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div className="outside-form-container">
        <div className="form-container">
          <h1>Courses</h1>

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
            </thead>
          </table>
          <br />
          {courses.map((item) =>
            Boolean(item[3]) ? (
              <>
                <button
                  onClick={() => navigateUser(item[0])}
                  className="btn btn-outline-dark mb-3"
                >
                  <div className="card-header">{item[2]} <div>{isStarted(Boolean(item[4])) }</div></div>
                  <div className="card-body">
                    <h5 className="card-title">{item[1]}</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </button>
                <br />
              </>
            ) : (
              <></>
            )
          )}

        </div>
      </div>
    </>
  );
};
