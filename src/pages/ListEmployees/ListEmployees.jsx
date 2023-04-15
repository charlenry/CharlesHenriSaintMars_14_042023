import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

const ListEmployees = (props) => {
  return (
    <>
      <Header />
      <div id="list-employee-container" className="container bg-dark">
        <h1>Current Employees <br/> (in development)</h1>
        <table id="employees-table" className="display"></table>
        <Link to="/">Home</Link>
      </div>
    </>
  );
};

export default ListEmployees;
