import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../services/useHttp";

export const TeacherCourseView = ({ course }) => {
  const [isClicked, setClicked] = useState(Boolean(false));
  const [isClicked2, setClicked2] = useState(Boolean(false));
  const [isEnroled, setEnroled] = useState(Boolean(false));
  const [isStarted, setStarted] = useState(Boolean(false));
  const http = useHttp();
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const checkEnrolled = async () => {
    let data = await http.get("/exists/" + String(course.courseId));
    setEnroled(data.data);
    if (data.data) {
      data = await http.get("/started/" + String(course.courseId));
      setStarted(data.data);
    } else {
      console.log("abcd");
    }
    // started console.log(data.data);
  };
  useEffect(() => {
    checkEnrolled();
  }, [course]);
  const getTeachers = async () => {
    const { data } = await http.get("/getteachers/" + String(course.courseId));
    const data2 = Array.from(data);
    setTeachers(data2);
    setUsers([...students, ...data2]);
    console.log("asdf", data2);
    setClicked(Boolean(true));
  };
  const getStudents = async () => {
    const { data } = await http.get("/getstudents/" + String(course.courseId));
    const data2 = Array.from(data);
    setStudents(data2);
    setUsers([...teachers, ...data2]);
    console.log("asdf", data2);
    setClicked2(Boolean(true));
  };
  const startCourse= async ()=>{
    let data = await http.get("/start/" + String(course.courseId));
    data = await http.get("/started/" + String(course.courseId));
    setStarted(data.data);
  }
  const navigateUser = (index) => {
    console.log(index);
    navigate("/ViewUser", { state: { id: index } });
  };
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
  const viewStudents = () => {
    return (
      <table className="table ">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => sortUsers(1)}
              >
                Sort Name
              </button>
            </th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => sortUsers(2)}
              >
                Sort Username
              </button>
            </th>
            <th scope="col"></th>
          </tr>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) =>
            Boolean(item[3]) && item[4] === "STUDENT" ? (
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
              </tr>
            ) : (
              <></>
            )
          )}
        </tbody>
      </table>
    );
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
            Boolean(item[3]) && item[4] === "TEACHER" ? (
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
  if (!isEnroled) {
    return <></>;
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => {
          isClicked ? setClicked(Boolean(false)) : getTeachers();
        }}
      >
        {isClicked ? "Hide Teachers" : "View Teachers"}
      </button>
      {isClicked && viewTeachers()}
      <br />
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => {
          isClicked2 ? setClicked2(Boolean(false)) : getStudents();
        }}
      >
        {isClicked2 ? "Hide Students" : "View Students"}
      </button>
      {isClicked2 && viewStudents()}
      <br />
      {!isStarted && (
        <button type="button" class="btn btn-outline-danger" onClick={()=>startCourse()}>
          Start Course
        </button>
      )}
    </>
  );
};
