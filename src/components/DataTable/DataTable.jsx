import "./DataTable.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fa5_solid_sort,
  fa5_solid_sortUp,
  fa5_solid_sortDown,
} from "fontawesome-svgs";
import { selectEmployees, sort } from "../../redux/actions";

const DataTable = (props) => {
  // Propsables
  const [tableTitle] = useState("Current Employees");

  // title is the column title.
  // propertyName is the name of the property to place in column.
  // PropertyType can be string or date or number.
  // id is the column number. It begins at 1.
  const [columnTitles] = useState([
    {
      title: "First Name",
      propertyName: "firstName",
      propertyType: "string",
      id: 1,
    },
    {
      title: "Last Name",
      propertyName: "lastName",
      propertyType: "string",
      id: 2,
    },
    {
      title: "Start Date",
      propertyName: "startDate",
      propertyType: "date",
      id: 3,
    },
    {
      title: "Department",
      propertyName: "department",
      propertyType: "string",
      id: 4,
    },
    {
      title: "Date of Birth",
      propertyName: "dateOfBirth",
      propertyType: "date",
      id: 5,
    },
    {
      title: "Street",
      propertyName: "street",
      propertyType: "string",
      id: 6
    },
    {
      title: "City",
      propertyName: "city",
      propertyType: "string",
      id: 7,
    },
    {
      title: "State",
      propertyName: "state",
      propertyType: "string",
      id: 8,
    },
    {
      title: "Zip Code",
      propertyName: "zipCode",
      propertyType: "number",
      id: 9,
    },
  ]);

  // Data
  const { rdxEmployees } = useSelector((state) => ({
    ...state.employeesReducer,
  }));

  // Other local states
  const [query, setQuery] = useState("");
  //  true <=> desc sorting ; false <=> asc sorting
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const iconsRef = useRef([]);

  const addToRef = (iconRef) => {
    if (iconRef && !iconsRef.current.includes(iconRef)) {
      iconsRef.current.push(iconRef);
    }
  };

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

    iconsRef.current.forEach((iconRef) => {
      if (iconRef.id === `#${column}` && toggle === true) {
        iconRef.className = "solid-sort-up";
      } else if (iconRef.id === `#${column}` && toggle === false) {
        iconRef.className = "solid-sort-down";
      } else {
        iconRef.className = "solid-sort";
      }
    });

    if (toggle) {
      dispatch(sort(column, "asc", type));
    } else {
      dispatch(sort(column, "desc", type));
    }
  };

  return (
    <div className="dataTable-container">
      <h1 className="dataTable-title">{tableTitle}</h1>

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
              {columnTitles.map((column) => {
                return (
                  <th
                    key={column.propertyName}
                    onClick={() =>
                      handleSort(column.propertyName, column.propertyType)
                    }
                  >
                    {column.title}{" "}
                    <i
                      ref={addToRef}
                      id={`#${column.propertyName}`}
                      className={(column.id === 1) ? "solid-sort-up" : "solid-sort"}
                    ></i>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* To customize */}
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
