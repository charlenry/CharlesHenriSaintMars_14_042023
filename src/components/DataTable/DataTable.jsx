import "./DataTable.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fa5_solid_sort,
  fa5_solid_sortUp,
  fa5_solid_sortDown,
} from "fontawesome-svgs";
import { selectEmployees } from "../../redux/actions";

const DataTable = (props) => {
  const { rdxEmployees } = useSelector((state) => ({
    ...state.employeesReducer,
  }));

  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const allSortIcons = document.querySelectorAll(".solid-sort");
    allSortIcons.forEach((icon) => (icon.innerHTML = fa5_solid_sort));
    document.querySelector(".solid-sort-up").innerHTML = fa5_solid_sortUp;
    // document.querySelector(".solid-sort-down").innerHTML = fa5_solid_sortDown;
  }, [query]);

  const handleSearch = (q) => {
    setQuery(q);
    document.querySelector(".button-reset-search").style.display = "block";
    dispatch(selectEmployees(q));
  };

  const handleResetSearch = () => {
    setQuery("");
    document.querySelector(".button-reset-search").style.display = "none";
    dispatch(selectEmployees(""));
  };

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
              <th>
                First Name&nbsp;<i className="solid-sort-up"></i>
              </th>
              <th>
                Last Name&nbsp;<i className="solid-sort"></i>
              </th>
              <th>
                Start Date&nbsp;<i className="solid-sort"></i>
              </th>
              <th>
                Department&nbsp;<i className="solid-sort"></i>
              </th>
              <th>
                Date of Birth&nbsp;<i className="solid-sort"></i>
              </th>
              <th>
                Street&nbsp;<i className="solid-sort"></i>
              </th>
              <th>
                City&nbsp;<i className="solid-sort"></i>
              </th>
              <th>
                State&nbsp;<i className="solid-sort"></i>
              </th>
              <th>
                Zip Code&nbsp;<i className="solid-sort"></i>
              </th>
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
        <div className="pagination-container"></div>
      </div>
    </div>
  );
};

export default DataTable;
