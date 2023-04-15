import './DataTable.scss'
// import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fa5_solid_sort,
  fa5_solid_sortUp,
  fa5_solid_sortDown,
} from "fontawesome-svgs";

const DataTable = (props) => {
  const { rdxEmployees } = useSelector((state) => ({
    ...state.employeesReducer,
  }));

  useEffect(() => {
    const allSortIcons = document.querySelectorAll(".solid-sort");
    allSortIcons.forEach(icon => icon.innerHTML = fa5_solid_sort);
    document.querySelector(".solid-sort-up").innerHTML = fa5_solid_sortUp;
    // document.querySelector(".solid-sort-down").innerHTML = fa5_solid_sortDown;

  }, []);

  return (
    <div className="table-container">
      <h1>Current Employees</h1>
      <table id="employees-table" className="table">
        <thead>
          <tr>
            <th>First Name&nbsp;<i className="solid-sort-up"></i></th>
            <th>Last Name&nbsp;<i className="solid-sort"></i></th>
            <th>Start Date&nbsp;<i className="solid-sort"></i></th>
            <th>Department&nbsp;<i className="solid-sort"></i></th>
            <th>Date of Birth&nbsp;<i className="solid-sort"></i></th>
            <th>Street&nbsp;<i className="solid-sort"></i></th>
            <th>City&nbsp;<i className="solid-sort"></i></th>
            <th>State&nbsp;<i className="solid-sort"></i></th>
            <th>Zip Code&nbsp;<i className="solid-sort"></i></th>
          </tr>
        </thead>
        <tbody>
          {rdxEmployees.map((state) => {
            return (
              <tr key={state.id}>
                <td id="firstName">{state.firstName}</td>
                <td id="lastName">{state.lastName}</td>
                <td id="startDate">{state.startDate}</td>
                <td id="department">{state.department}</td>
                <td id="dateOfBirth">{state.dateOfBirth}</td>
                <td id="street">{state.street}</td>
                <td id="city">{state.city}</td>
                <td id="state">{state.state}</td>
                <td id="zipCode">{state.zipCode}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
