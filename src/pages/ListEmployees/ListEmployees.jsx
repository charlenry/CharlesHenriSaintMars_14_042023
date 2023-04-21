import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import DataTable from "../../components/DataTable/DataTable";

/**
 * Defining a functional component named `ListEmployees` which is a component parent for the component DataTable.
 * Component's Hierarchy: ListEmployees
 * 
 * @component
 * @name ListEmployees
 * @kind function
 * @param {*} props - No props
 * @returns { JSX.Element }
 */
const ListEmployees = (props) => {
  return (
    <>
      <Header />
      <div id="list-employee-container" className="bg-dark">
        <DataTable />
        <Link className="button-link" to="/">Home</Link>
      </div>
    </>
  );
};

export default ListEmployees;
