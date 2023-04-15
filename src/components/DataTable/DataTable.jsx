// import { useState } from "react";
// import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const DataTable = (props) => {
  const { rdxEmployees } = useSelector((state) => ({
    ...state.employeesReducer,
  }));

  return (
    <div className="table-container">
      <h1>Current Employees</h1>
      <table id="employees-table" className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {rdxEmployees.map((state) => {
            return (
              <tr key={state.id}>
                <td>{state.firstName}</td>
                <td>{state.lastName}</td>
                <td>{state.startDate}</td>
                <td>{state.department}</td>
                <td>{state.dateOfBirth}</td>
                <td>{state.street}</td>
                <td>{state.city}</td>
                <td>{state.state}</td>
                <td>{state.zipCode}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
