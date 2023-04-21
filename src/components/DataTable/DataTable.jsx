import "./DataTable.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fa5_solid_sort,
  fa5_solid_sortUp,
  fa5_solid_sortDown,
} from "fontawesome-svgs";
import { selectEmployees, sort } from "../../redux/actions";
import ReactPaginate from "react-paginate";

/**
 * This is defining a functional component called `DataTable` that renders a data table.
 * Component's Hierarchy: ListEmployees > DataTable
 *
 * @component
 * @name DataTable
 * @kind function
 * @param {*} props - No props but some local states can but replace by props
 * @returns { JSX.Element }
 */
const DataTable = (props) => {
  /*Begin of local propsable states */
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
  const { rdxEmployees, rdxTotalEmployees } = useSelector((state) => ({
    ...state.employeesReducer,
  }));
  /* End of local propsable states */

  // Other local states
  const [query, setQuery] = useState("");
  //  true <=> desc sorting ; false <=> asc sorting
  const [toggle, setToggle] = useState(false);
  const [linesPerPage] = useState([10, 25, 50, 100]);
  const [linesPerPageSelected, setLinesPerPageSelected] = useState(10);
  const [pageCount, setPageCount] = useState(
    Math.ceil(rdxEmployees.length / Number(linesPerPageSelected))
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [nextSelectedPage, setNextSelectedPage] = useState(0);

  /* Begin of pagination management */
  const pagesVisited = currentPage * Number(linesPerPageSelected);
  const paginationResult = rdxEmployees
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

  const renderEmployees =
    rdxEmployees.length === 0 ? (
      <tr>
        <td colSpan="9" style={{ textAlign: "center" }}>
          No matching records found
        </td>
      </tr>
    ) : (
      paginationResult
    );

  /**
   * `handlePageChange` is used as a callback function for the `onPageChange` event of the `ReactPaginate` component. When the user clicks on a page number, this function is called with the selected page number as its argument. The `setCurrentPage` function is then called with the selected page number to update the current page state.
   *
   * @function
   * @name handlePageChange
   * @memberof DataTable
   * @param {number} - The number of the selected page
   * @returns {void}
   */
  const handlePageChange = ({ selected }) => {
    setCurrentPage(Number(selected));
  };

  /**
   * `handlePageClick` is a function that is used as a callback for the `onPageChange` event of the `ReactPaginate` component. It is called when the user clicks on a page number. It checks if the selected page number is greater than the total number of pages or undefined, and if it is, it returns false. Otherwise, it sets the `nextSelectedPage` state to the selected page number.
   *
   * @function
   * @name handlePageClick
   * @kind variable
   * @memberof DataTable
   * @param {any} e
   * @returns {false | undefined}
   */
  const handlePageClick = (e) => {
    if (
      (Number(e.nextSelectedPage) > pageCount ||
        e.nextSelectedPage === undefined) &&
      e.isNext === true
    ) {
      return false;
    }
    if (
      (Number(e.nextSelectedPage) > pageCount ||
        e.nextSelectedPage === undefined) &&
      e.isPrevious === true
    ) {
      return false;
    }

    setNextSelectedPage(Number(e.nextSelectedPage));
  };
  /* End of pagination management */

  /**
   * `dispatch` is using the `useDispatch` hook from the `react-redux` library to get a reference to the `dispatch` function from the Redux store. This allows the component to dispatch actions to update the state of the application.
   *
   * @constant
   * @name dispatch
   * @memberof DataTable
   */
  const dispatch = useDispatch();

  // Referencing of sorting icons
  const iconsRef = useRef([]);

  /**
   * `addToRef` is a function that takes an argument `iconRef` and adds it to the `iconsRef` array using the `push` method. This function is used to keep track of all the sorting icons in the table so that their classes can be updated when a column is sorted. The `useRef` hook is used to create a mutable reference to the `iconsRef` array so that it can be updated without causing a re-render of the component.
   *
   * @function
   * @name addToRef
   * @memberof DataTable
   * @param {Object} iconRef
   * @returns {void}
   */
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

  // Events processing

  /**
   * `handleSearch` is a function that takes a parameter `q` (query) and updates the `query` state with the value of `q`. It then checks if the `query` state is an empty string, and if it is, it hides the reset search button. If the `query` state is not empty, it displays the reset search button. It then dispatches the `selectEmployees` action with the `query` state as its argument, and dispatches the `sort` action with the default sorting column (`"firstName"`), sorting order (`"asc"`), and sorting type (`"string"`) as its arguments.
   *
   * @function
   * @name handleSearch
   * @memberof DataTable
   * @param {any} q
   * @returns {void}
   */
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

  /**
   * The above code is declaring a function called `handleResetSearch` which hides the reset search button. It then dispatches the `selectEmployees` action with an empty string as argument, and dispatches the `sort` action with the default sorting column (`"firstName"`), sorting order (`"asc"`), and sorting type (`"string"`) as its arguments.
   *
   * @function
   * @name handleResetSearch
   * @kind variable
   * @memberof DataTable
   * @returns {void}
   */
  const handleResetSearch = () => {
    setQuery("");
    document.querySelector(".button-reset-search").style.display = "none";
    dispatch(selectEmployees(""));
    dispatch(sort("firstName", "asc", "string"));
  };

  /**
   * The above code defines a function called `handleSort` that takes two parameters: `column` and `type`. It swaps the value of the `toggle` state. Then It updates the icon of the selected column and dispatches the `sort` action with column, order and the type of the column as arguments.
   *
   * @function
   * @name handleSort
   * @memberof DataTable
   * @param {string} column - The name of the column
   * @param {any} type - The type of the column. It can be a string, a date or a number.
   * @returns {void}
   */
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
            <label htmlFor="search">Search:</label>
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
          <div className="pagination-overview">
            Showing&nbsp;
            {rdxEmployees.length === 0 ? pagesVisited : pagesVisited + 1}
            &nbsp;to&nbsp;
            {pagesVisited + linesPerPageSelected <= rdxEmployees.length
              ? pagesVisited + linesPerPageSelected
              : rdxEmployees.length}
            &nbsp;of&nbsp;{rdxEmployees.length}&nbsp;entries&nbsp;
            {rdxEmployees.length === 0 &&
              `(filtered from ${rdxTotalEmployees} total entries)`}
          </div>
          <div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              onClick={handlePageClick}
              renderOnZeroPageCount={undefined}
              forcePage={
                pageCount === 0
                  ? -1
                  : (nextSelectedPage >= pageCount ||
                      nextSelectedPage === undefined) &&
                    0
              }
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
