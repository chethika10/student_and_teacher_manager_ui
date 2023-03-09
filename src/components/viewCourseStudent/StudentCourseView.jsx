import { useEffect, useState } from "react";
import useHttp from "../../services/useHttp";

export const StudentCourseView = ({ course }) => {
  const [isClicked, setClicked] = useState(Boolean(false));
  const [isEnroled, setEnroled] = useState(Boolean(false));
  const http = useHttp();

  // const location = useLocation();
  // const course = location.state.course;
  const [users, setUsers] = useState([]);
  const checkEnrolled = async () => {
    
    const data = await http.get("/exists/" + String(course.courseId));
    setEnroled(data.data);
    console.log(data.data);
  };
  useEffect(() => {
    checkEnrolled();
  }, [course]);
  const getdata = async () => {
    const { data } = await http.get("/getteachers/" + String(course.courseId));
    const data2 = Array.from(data);
    setUsers(data2);
    console.log("asdf", data2);
    setClicked(Boolean(true));
  };
  const enroll = async ()=>{
    await http.get("/enrol/" + String(course.courseId))
    checkEnrolled()
  }
  const unenroll= async ()=>{
    await http.get("/unenrol/" + String(course.courseId))
    checkEnrolled()
  }
  const sortUsers = (column) => {
    var users2 = [...users];
    if (column === 0) {
      users2.sort((a, b) => a[0] - b[0]);
      setUsers(users2);
      return;
    } else {
      users2.sort((a, b) => {
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
      setUsers(users2);
      return;
    }
  };
  const viewTeachers = () => {
    return (
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => sortUsers(1)}
              >
                Sort Name
              </button>
            </th>

            <th scope="col"></th>
          </tr>
          <tr>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) =>
            Boolean(item[3]) ? (
              <tr key={item[0]}>
                <td key={item[1].uniqueId}>{item[1]}</td>
              </tr>
            ) : (
              <></>
            )
          )}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => {
          isClicked ? setClicked(Boolean(false)) : getdata();
        }}
      >
        {isClicked ? "Hide Teachers" : "View Teachers"}
      </button>
      {isClicked && viewTeachers()}

      {isEnroled && !Boolean(course.started) && course.enabled && (
        <button
          type="button"
          className="btn btn-outline-dark"
           onClick={() => unenroll()}
        >
          Unenroll
        </button>
      )}
      {!isEnroled && !Boolean(course.started) && course.enabled && (
        <button
          type="button"
          className="btn btn-outline-dark"
           onClick={() => enroll()}
        >
          enroll
        </button>
      )}
    </>
  );
};
