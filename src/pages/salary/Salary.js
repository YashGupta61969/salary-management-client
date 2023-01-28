import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./salary.css";

function Salary() {
  const { token } = useSelector((state) => state.admin.admin);
  const navigate = useNavigate();
  
  const page = new URLSearchParams(useLocation().search).get('page')
  const [salary, setSalary] = useState([]);
  const [areMorePages, setAreMorePages] = useState(false)
  // const [itemOffset, setItemOffset] = useState(0);
  // const endOffset = itemOffset + 10;

  // const currentItems = salary.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(salary.length / 10);


  useEffect(() => {
    token &&
      fetch(`http://localhost:8000/salary?page=${Number(page)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setAreMorePages(res.areMorePages)
          setSalary(res.result);
        })
        .catch((err) => console.log(err));
  }, [page]);
  
  const navigateToAnotherPage = (p)=>{
   navigate({
      pathname: '/salaries',
      search: `?page=${p}`,
    });
  }
  
  return (
    <div className="dashboard">
      <h1>Salaries</h1>
      <div className="salaryForm">
        <button onClick={() => navigate("/salary-form")}>Add Salary</button>
      </div>
      <div className="tableContainer">
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Total Working Days</th>
              <th>Total Leaves Taken</th>
              <th>Overtime</th>
              <th>Total Salary Made</th>
            </tr>
            {salary &&
              salary.map((s) => {
                if(s.is_salary_calculated){
                 return <tr key={s.id}>
                    <td>{s.Employee.name}</td>
                    <td>{s.month}</td>
                    <td>{s.year}</td>
                    <td>{s.total_working_days}</td>
                    <td>{s.total_leaves_taken}</td>
                    <td>{s.overtime}</td>
                    <td>{s.total_salary_made}</td>
                  </tr>
                }
              })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
          <button disabled={page < 2} onClick={()=>navigateToAnotherPage(page - 1)}>Previous</button>
          <button onClick={()=>areMorePages && navigateToAnotherPage(Number(page) + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Salary;
