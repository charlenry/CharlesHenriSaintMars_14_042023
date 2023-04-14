import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEmployee, setButtonSaveClicked, resetFlags } from "../../redux/actions";
// import { useNavigate } from "react-router-dom";

const CreateEmployee = (props) => {
  const { rdxDepartments, rdxStates, isButtonSaveClicked, isEmployeeCreated } = useSelector(
    (state) => ({
      ...state.employeesReducer,
    })
  );

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [department, setDepartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleSave = (e) => {
    dispatch(setButtonSaveClicked());
    
    if (
      firstName === "" || 
      lastName === ""  || 
      dateOfBirth === "" || 
      startDate === "" || 
      department === "" || 
      street === "" || 
      city === "" || 
      state === "" || 
      zipCode === ""
    ) {
      e.preventDefault();
    } else {
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
    }
    
  }

  const handleCloseModal = (e) => {
    // e.preventDefault();
    const confirmation = document.getElementById("confirmation");
    confirmation.style.display = "none";
    document.getElementById("create-employee").reset();
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setStartDate("");
    setDepartment("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    dispatch(resetFlags());

  }

  useEffect(() => {
    const confirmation = document.getElementById("confirmation");

    if (isEmployeeCreated) {
      confirmation.style.display = "block";
    }
  }, [dispatch, isEmployeeCreated])


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
            required
          />
          {(!firstName && isButtonSaveClicked) && <div className="invalid-field">This field is mandatory.</div>}

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {(!lastName && isButtonSaveClicked) && <div className="invalid-field">This field is mandatory.</div>}

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            id="date-of-birth"
            type="date"
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
          {(!dateOfBirth && isButtonSaveClicked) && <div className="invalid-field">This field is mandatory.</div>}

          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          {(!startDate && isButtonSaveClicked) && <div className="invalid-field">This field is mandatory.</div>}

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            {(!street && isButtonSaveClicked) && <div className="invalid-field">This field is mandatory.</div>}

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              onChange={(e) => setCity(e.target.value)}
              required
            />
            {(!city && isButtonSaveClicked) && <div className="invalid-field">This field is mandatory.</div>}

            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              onChange={(e) => setState(e.target.value)}
              required
            >
              {rdxStates.map((state) => {
                return (
                  <option key={state.name} value={state.abbreviation}>
                    {state.name}
                  </option>
                );
              })}
            </select>
            {(!state && isButtonSaveClicked) && <div className="invalid-field">This field is mandatory.</div>}

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
            {(!zipCode && isButtonSaveClicked) && <div className="invalid-field">This field is mandatory.</div>}
          </fieldset>

          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            {rdxDepartments.map((department) => {
              return (
                <option key={department} value={department}>
                  {department}
                </option>
              );
            })}
          </select>
          {(!department && isButtonSaveClicked) && <div className="invalid-field">This field is mandatory.</div>}
        </form>

        <button className="button-save" type="button" onClick={handleSave}>
          Save
        </button>

        <div id="confirmation" className="modal">
          <div className="modal-content">
            {/* Modal content */}
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <p>Employee Created!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
