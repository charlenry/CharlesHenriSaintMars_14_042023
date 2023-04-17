import "./DataTable.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fa5_solid_sort,
  fa5_solid_sortUp,
  fa5_solid_sortDown,
} from "fontawesome-svgs";
import { selectEmployees, sort } from "../../redux/actions";

const DataTable = (props) => {
  const { rdxEmployees } = useSelector((state) => ({
    ...state.employeesReducer,
  }));

  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  //  true <=> asc sorting ; false <=> desc sorting 
  const [toggle, setToggle] = useState(false);  

  useEffect(() => {
    const allSortIcons = document.querySelectorAll(".solid-sort");
    allSortIcons.forEach((icon) => (icon.innerHTML = fa5_solid_sort));
    const allSortUpIcons = document.querySelectorAll(".solid-sort-up");
    allSortUpIcons.forEach((icon) => (icon.innerHTML = fa5_solid_sortUp));
    const allSortDownIcons = document.querySelectorAll(".solid-sort-down");
    allSortDownIcons.forEach((icon) => (icon.innerHTML = fa5_solid_sortDown));
  }, [query, toggle]);

  useEffect(() => {
    dispatch(sort("firstName", "asc", "string"));
  }, [dispatch]);

  const handleSearch = (q) => {
    setQuery(q);
    if (q === "") {
      document.querySelector(".button-reset-search").style.display = "none";
    } else {
      document.querySelector(".button-reset-search").style.display = "block";
    }
    dispatch(selectEmployees(q));
    dispatch(sort("firstName", "asc", "string"));
  };

  const handleResetSearch = () => {
    setQuery("");
    document.querySelector(".button-reset-search").style.display = "none";
    dispatch(selectEmployees(""));
    dispatch(sort("firstName", "asc", "string"));
  };

  const handleSort = (column, type) => {
    setToggle(!toggle);

    if (column === "firstName" && toggle === true) {
      document.querySelector("#firstNameIcon").className = "solid-sort-up";
    } else if (column === "firstName" && toggle === false) {
      document.querySelector("#firstNameIcon").className = "solid-sort-down";
    } else {
      document.querySelector("#firstNameIcon").className = "solid-sort";
    }
    
    if (column === "lastName" && toggle === true) {
      document.querySelector("#lastNameIcon").className = "solid-sort-up";
    } else if (column === "lastName" && toggle === false) {
      document.querySelector("#lastNameIcon").className = "solid-sort-down";
    } else {
      document.querySelector("#lastNameIcon").className = "solid-sort";
    }

    if (column === "startDate" && toggle === true) {
      document.querySelector("#startDateIcon").className = "solid-sort-up";
    } else if (column === "startDate" && toggle === false) {
      document.querySelector("#startDateIcon").className = "solid-sort-down";
    } else {
      document.querySelector("#startDateIcon").className = "solid-sort";
    }

    if (column === "department" && toggle === true) {
      document.querySelector("#departmentIcon").className = "solid-sort-up";
    } else if (column === "department" && toggle === false) {
      document.querySelector("#departmentIcon").className = "solid-sort-down";
    } else {
      document.querySelector("#departmentIcon").className = "solid-sort";
    }

    if (column === "dateOfBirth" && toggle === true) {
      document.querySelector("#dateOfBirthIcon").className = "solid-sort-up";
    } else if (column === "dateOfBirth" && toggle === false) {
      document.querySelector("#dateOfBirthIcon").className = "solid-sort-down";
    } else {
      document.querySelector("#dateOfBirthIcon").className = "solid-sort";
    }

    if (column === "street" && toggle === true) {
      document.querySelector("#streetIcon").className = "solid-sort-up";
    } else if (column === "street" && toggle === false) {
      document.querySelector("#streetIcon").className = "solid-sort-down";
    } else {
      document.querySelector("#streetIcon").className = "solid-sort";
    }

    if (column === "city" && toggle === true) {
      document.querySelector("#cityIcon").className = "solid-sort-up";
    } else if (column === "city" && toggle === false) {
      document.querySelector("#cityIcon").className = "solid-sort-down";
    } else {
      document.querySelector("#cityIcon").className = "solid-sort";
    }

    if (column === "state" && toggle === true) {
      document.querySelector("#stateIcon").className = "solid-sort-up";
    } else if (column === "state" && toggle === false) {
      document.querySelector("#stateIcon").className = "solid-sort-down";
    } else {
      document.querySelector("#stateIcon").className = "solid-sort";
    }

    if (column === "zipCode" && toggle === true) {
      document.querySelector("#zipCodeIcon").className = "solid-sort-up";
    } else if (column === "zipCode" && toggle === false) {
      document.querySelector("#zipCodeIcon").className = "solid-sort-down";
    } else {
      document.querySelector("#zipCodeIcon").className = "solid-sort";
    }

    if (toggle) {
      dispatch(sort(column, "asc", type));
    } else {
      dispatch(sort(column, "desc", type));
    }
  }

  return (
    <div className="dataTable-container">
      <h1 className="dataTable-title">Current Employees</h1>

      <div className="dataTable-content">
        <div className="filters-container">
          <div className="entries-container">
            <label htmlFor="entries">Show</label>
            <select name="entries" id="entries">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <p>entries</p>
          </div>
          <div className="search-container">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <span className="button-reset-search" onClick={handleResetSearch}>
              &times;
            </span>
          </div>
        </div>

        <table id="employees-table" className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort("firstName", "string")}>
                First Name&nbsp;<i id="firstNameIcon" className="solid-sort-up"></i>
              </th>
              <th onClick={() => handleSort("lastName", "string")}>
                Last Name&nbsp;<i id="lastNameIcon" className="solid-sort"></i>
              </th>
              <th onClick={() => handleSort("startDate", "date")}>
                Start Date&nbsp;<i id="startDateIcon" className="solid-sort"></i>
              </th>
              <th onClick={() => handleSort("department", "string")}>
                Department&nbsp;<i id="departmentIcon" className="solid-sort"></i>
              </th>
              <th onClick={() => handleSort("dateOfBirth", "date")}>
                Date of Birth&nbsp;<i id="dateOfBirthIcon" className="solid-sort"></i>
              </th>
              <th onClick={() => handleSort("street", "string")}>
                Street&nbsp;<i id="streetIcon" className="solid-sort"></i>
              </th>
              <th onClick={() => handleSort("city", "string")}>
                City&nbsp;<i id="cityIcon" className="solid-sort"></i>
              </th>
              <th onClick={() => handleSort("state", "string")}>
                State&nbsp;<i id="stateIcon" className="solid-sort"></i>
              </th>
              <th onClick={() => handleSort("zipCode", "number")}>
                Zip Code&nbsp;<i id="zipCodeIcon" className="solid-sort"></i>
              </th>
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
        <div className="pagination-container"></div>
      </div>
    </div>
  );
};

export default DataTable;
