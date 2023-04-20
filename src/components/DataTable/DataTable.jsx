import "./DataTable.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fa5_solid_sort,
  fa5_solid_sortUp,
  fa5_solid_sortDown,
} from "fontawesome-svgs";
import { selectEmployees, sort } from "../../redux/actions";
import ReactPaginate from 'react-paginate';

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
      id: 6,
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
  const [linesPerPage] = useState([10, 25, 50, 100]);
  const [linesPerPageSelected, setLinesPerPageSelected] = useState(10);
  const [pageCount, setPageCount] = useState(Math.ceil(rdxEmployees.length / Number(linesPerPageSelected)));
  const [currentPage, setCurrentPage] = useState(0);
  const [nextSelectedPage, setNextSelectedPage] = useState(0);

  // Pagination
  const pagesVisited = currentPage * Number(linesPerPageSelected);
  const renderEmployees = rdxEmployees
    .slice(pagesVisited, pagesVisited + linesPerPageSelected)
    .map((employee) => {
      return (
        <tr key={employee.id}>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.startDate}</td>
          <td>{employee.department}</td>
          <td>{employee.dateOfBirth}</td>
          <td>{employee.street}</td>
          <td>{employee.city}</td>
          <td>{employee.state}</td>
          <td>{employee.zipCode}</td>
        </tr>
      );
    });

  const handlePageChange = ({selected}) => {
    setCurrentPage(Number(selected));
  }

  const handlePageClick = (e) => {
    if (e.nextSelectedPage > pageCount && e.isNext === true) return false;
    if (e.nextSelectedPage > pageCount && e.isPrevious === true) return false;
    setNextSelectedPage(e.nextSelectedPage);
  }

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

  useEffect(() => {
    setPageCount(Math.ceil(rdxEmployees.length / Number(linesPerPageSelected)));
    setCurrentPage(0);
  }, [linesPerPageSelected, pageCount, rdxEmployees.length]);


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
            <select
              name="entries"
              id="entries"
              value={linesPerPageSelected}
              onChange={(e) => setLinesPerPageSelected(Number(e.target.value))}
            >
              {linesPerPage.map((linesNumber) => {
                return (
                  <option key={linesNumber} value={linesNumber}>
                    {linesNumber}
                  </option>
                );
              })}
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
                      className={
                        column.id === 1 ? "solid-sort-up" : "solid-sort"
                      }
                    ></i>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* To customize, see above. */}
            {renderEmployees}
          </tbody>
        </table>

        <div className="pagination-container">
          <div>
            Showing {pagesVisited  + 1} to {((pagesVisited + linesPerPageSelected) <= rdxEmployees.length) ? (pagesVisited + linesPerPageSelected) : rdxEmployees.length} of {rdxEmployees.length}{" "}entries
          </div>
          <div>
            <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              onClick={handlePageClick}
              forcePage={(nextSelectedPage >= pageCount) ? (pageCount - 1) : ""}
              containerClassName={"paginationBtns"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
