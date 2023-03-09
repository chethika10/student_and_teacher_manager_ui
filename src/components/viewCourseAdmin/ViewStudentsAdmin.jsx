import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useHttp from "../../services/useHttp";

export const ViewStudentsAdmin=()=>{
    const http=useHttp()
    const [users,setUsers]=useState([])
    const location = useLocation();
    const navigate = useNavigate();
    const course = location.state.course;

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
      const unEnrollStusent=async(uname)=>{
        var courseId=course.courseId
        var username=uname
        var data={courseId,username}
        const data2=await http.post("/unenrolstudent",data)
        //console.log(data2.data)
        if(data2 && Boolean(data2.data)){
          alert("Student removed")
          getdata()
        }else{
          alert("error")
        }
      }
      const getdata = async () => {
        const { data } = await http.get("/getstudents/"+String(course.courseId));
        const data2 = Array.from(data);
        setUsers(data2);
        console.log("asdf",data2)
      };
      const navigateUser = (index) => {
        console.log(index);
        navigate("/ViewUser", { state: { id: index } });
      };
      useEffect(() => {
        getdata();
      }, []);
    return(
        <div className="outside-form-container">
        <div className="form-container">
          <h1>All Students for {course.moduleCode}</h1>

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
                    <td key={item[3].uniqueId}>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => unEnrollStusent(item[2])}
                      >
                        unenroll
                      </button>
                    </td>
                  </tr>
                ) : (
                  <></>
                )
              )}
            </tbody>
          </table>
          <br />
        </div>
      </div>
    )
}