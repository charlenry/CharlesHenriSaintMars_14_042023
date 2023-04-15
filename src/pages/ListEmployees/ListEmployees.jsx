import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import DataTable from "../../components/DataTable/DataTable";

const ListEmployees = (props) => {
  return (
    <>
      <Header />
      <div id="list-employee-container" className="bg-dark">
        <DataTable />
        <Link to="/">Home</Link>
      </div>
    </>
  );
};

export default ListEmployees;
