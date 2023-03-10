import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../services/useHttp";

export const EditUserDetails = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const http = useHttp();

  const getdata = async () => {
    const { data } = await http.get("/profile");
    setUser(data);
    console.log(data);
    setName(data.name)
    setDate(data.birthDay);
    setAge(calcAge(data.birthDay))
    setEmail(data.email)
    return data;
  };
  const editAccount = async ()=>{
    var birthDay = date;
    const data={name,birthDay,email}
    const data2 = await http.post("/editaccount", data);
    console.log(data2.data);
    const data3 = data2.data;
    if (data3[0] === "0" || data3[0] === 0) {
        setStatus(data3[1]);
      }
      else{
        alert("edit successfull")
        navigate("/userDetails")
      }
  }
  const calcAge = (date) => {
    var today = new Date();
    var birthday = new Date(date);
    var age = today.getFullYear() - birthday.getFullYear();
    if (age < 0) {
      age = 0;
    }
    return age;
  };
  useEffect(() => {
    setUser(getdata());
  }, []);

  return (
    <>
      <div className="outside-form-container">
        <div className="form-container">
          <h1>Change Profile</h1>
          <div className="inside-form-container">
            <label htmlFor="name">Name</label>
            <br />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
            />
            <br />

            <label htmlFor="date">Birthday</label>
            <br />
            <input
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setAge(calcAge(e.target.value));
              }}
              type="date"
              id="Birthday"
              name="Birthday"
            />
            <br />

            <label htmlFor="age">Age</label>
            <br />
            <input
              value={age}
              readOnly
              type="text"
              placeholder={age}
              id="age"
              name="age"
            />
            <br />

            <label htmlFor="email">Email</label>
            <br />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@example.com"
              id="email"
              name="email"
            />
            <br />
            <div className="status">{status}</div>
            <button type="button" className="btn btn-outline-dark" onClick={() => editAccount()}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
