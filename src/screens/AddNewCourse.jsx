import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../services/useHttp";

export const AddNewCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [fee, setFee] = useState(0);
  const http=useHttp()
  const navigate=useNavigate()

  const validateFee=(fee)=>{
    if(fee<0){
        setFee(0)
    }
    else{
        setFee(fee)
    }
  }
  const addCourse=async (e)=>{
    e.preventDefault();
    const course={courseName,moduleCode,fee}
    const { data } = await http.post("/addCourse",course);
    console.log(data)
    if(data.courseId!==0){
      alert("course added succesfully")
      navigate("/AllCourcesAdmin")
    }else{
      alert("could not add the course")
    }

  }
  return (
    <>
      <div className="outside-form-container">
        <div className="form-container">
          <h1>Add Course</h1>
          <div className="inside-form-container">
            <form onSubmit={addCourse}>
              <label htmlFor="courseName">courseName</label>
              <br />
              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                type="text"
                id="courseName"
                name="courseName"
              />
              <br />

              <label htmlFor="moduleCode">Module Code</label>
              <br />
              <input
                value={moduleCode}
                onChange={(e) => setModuleCode(e.target.value)}
                type="text"
                id="moduleCode"
                name="moduleCode"
              />
              <br />

              <label htmlFor="fee">Fee</label>
              <br />
              <input
                value={fee}
                onChange={(e) => {
                    validateFee(e.target.value)
                }}
                type="number"
                id="fee"
                name="fee"
              />
              <br />
              <button type="submit" className="btn btn-outline-dark">Add Course</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
