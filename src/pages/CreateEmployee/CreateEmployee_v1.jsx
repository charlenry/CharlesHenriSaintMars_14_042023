import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEmployee, resetFlag } from "../../redux/actions";
// import { useNavigate } from "react-router-dom";

const CreateEmployee = (props) => {
  const { rdxDepartments, rdxStates, isEmployeeCreated } = useSelector((state) => ({
    ...state.employeesReducer,
  }));

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [department, setDepartment] = useState(rdxDepartments[0]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(rdxStates[0].abbreviation);
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const stateSelect = document.getElementById("state");

    // We delete the <option> elements for the
    // <select> to refresh the list of options.
    while (stateSelect.firstChild) {
      stateSelect.removeChild(stateSelect.firstChild);
    }

    rdxStates.forEach((state) => {
      const option = document.createElement("option");
      option.value = state.abbreviation;
      option.text = state.name;
      stateSelect.appendChild(option);
    });

    const departmentSelect = document.getElementById("department");

    // We delete the <option> elements for the
    // <select> to refresh the list of options.
    while (departmentSelect.firstChild) {
      departmentSelect.removeChild(departmentSelect.firstChild);
    }
    
    rdxDepartments.forEach((department) => {
      const option = document.createElement("option");
      option.value = department;
      option.text = department;
      departmentSelect.appendChild(option);
    });
  }, [rdxStates, rdxDepartments]);


  const handleSave = (e) => {
    e.preventDefault();
    const employee = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      startDate: startDate,
      department: department,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
    };
    dispatch(createEmployee(employee));
    if (isEmployeeCreated) {
      document.getElementById("create-employee").reset();
      dispatch(resetFlag());
    }
  };

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container bg-dark">
        <a href="employee-list.html">View Current Employees</a>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            id="date-of-birth"
            type="date"
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              onChange={(e) => setStreet(e.target.value)}
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />

            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              onChange={(e) => setState(e.target.value)}
            ></select>

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            onChange={(e) => setDepartment(e.target.value)}
          ></select>
        </form>

        <button className="button-save" onClick={handleSave}>
          Save
        </button>
        
        <div id="confirmation" class="modal">Employee Created!</div>
      </div>
    </>
  );
};

export default CreateEmployee;
