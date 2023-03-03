import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../services/useHttp";

export const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const http = useHttp();

  const getdata = async () => {
    const { data } = await http.get("/getall");
    const data2 = Array.from(data);
    setUsers(data2);
    //console.log("asdf",users)
  };

  const enableUser = async (index) => {
    const { data } = await http.get("/enableuser/" + String(index));
    if (data !== null) {
      setUsers(
        users.map((item) =>
          item[0] === data.id
            ? { ...[data.id, data.userName, data.role, data.enabled] }
            : item
        )
      );
    }
    console.log(data);
  };
  const disableUser = async (index) => {
    const { data } = await http.get("/disableuser/" + String(index));
    if (data !== null) {
      setUsers(
        users.map((item) =>
          item[0] === data.id
            ? { ...[data.id, data.userName, data.role, data.enabled] }
            : item
        )
      );
      // users.findIndex(obj => obj[0] === data.id)
    }
    // console.log(data)
  };
  const deleteUser = async (index) => {
    const { data } = await http.get("/deleteuser/" + String(index));
    if (data !== null) {
      setUsers(users.filter((item) => item[0] !== data.id));
      // users.findIndex(obj => obj[0] === data.id)
    }
  };

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

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="outside-form-container">
      <div className="form-container">
        <h1>All Users</h1>

        <table className="table ">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => sortUsers(0)}
                >
                  Sort Index
                </button>
              </th>
              <th scope="col">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => sortUsers(1)}
                >
                  Sort Username
                </button>
              </th>
              <th scope="col">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => sortUsers(2)}
                >
                  Sort Role
                </button>
              </th>
              <th scope="col"></th>
            </tr>
            <tr style={{ textAlign: "right" }}>
              <h3>Enabled users</h3>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col">Index</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
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
                  <td key={item[0].uniqueId}>{item[0]}</td>
                  <td key={item[1].uniqueId}>{item[1]}</td>
                  <td key={item[2].uniqueId}>{item[2]}</td>
                  <td key={item[3].uniqueId}>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => disableUser(item[0])}
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
              <h3>Disabled users</h3>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col">Index</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) =>
              !Boolean(item[3]) ? (
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
                  <td key={item[0].uniqueId}>{item[0]}</td>
                  <td key={item[1].uniqueId}>{item[1]}</td>
                  <td key={item[2].uniqueId}>{item[2]}</td>
                  <td key={item[3].uniqueId}>
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => enableUser(item[0])}
                    >
                      Enable
                    </button>{" "}
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => deleteUser(item[0])}
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
        <br />
      </div>
    </div>
  );
};
