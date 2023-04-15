import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createEmployee,
  setButtonSaveClicked,
  resetFlags,
} from "../../redux/actions";
import Header from "../../components/Header/Header";
import DatePicker from "../../components/DatePicker/DatePicker";
import Modal from "../../components/Modal/Modal";
// import { useNavigate } from "react-router-dom";

const CreateEmployee = (props) => {
  const { rdxDepartments, rdxStates, isButtonSaveClicked, isEmployeeCreated } =
    useSelector((state) => ({
      ...state.employeesReducer,
    }));

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
  const [isDateOfBirthCorrect, setIsDateOfBirthCorrect] = useState(false);
  const [isStartDateCorrect, setIsStartDateCorrect] = useState(false);
  // Control of the dates from 1900 to 2999
  const [datePattern] = useState(
    /^((19[0-9]{2})|(2[0-9]{3}))-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/
  );

  const handleSave = (e) => {
    dispatch(setButtonSaveClicked());
    setIsDateOfBirthCorrect(datePattern.test(dateOfBirth));
    setIsStartDateCorrect(datePattern.test(startDate));

    if (
      firstName === "" ||
      lastName === "" ||
      dateOfBirth === "" ||
      isDateOfBirthCorrect === false ||
      startDate === "" ||
      isStartDateCorrect === false ||
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
  };

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
  };

  useEffect(() => {    
    setIsDateOfBirthCorrect(datePattern.test(dateOfBirth));
    setIsStartDateCorrect(datePattern.test(startDate));
    
    const confirmation = document.getElementById("confirmation");
    if (isEmployeeCreated) {
      confirmation.style.display = "block";
    }
  }, [dispatch, isEmployeeCreated, datePattern, dateOfBirth, startDate]);


  return (
    <>
      <Header />
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
          {!firstName && isButtonSaveClicked && (
            <div className="invalid-input">Invalid input</div>
          )}

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {!lastName && isButtonSaveClicked && (
            <div className="invalid-input">Invalid input</div>
          )}

          <DatePicker
            htmlFor="date-of-birth"
            label="Date of Birth"
            handlerFunc={(e) => setDateOfBirth(e.target.value)}
          />
          {(!dateOfBirth || !isDateOfBirthCorrect) && isButtonSaveClicked && (
            <div className="invalid-input">Invalid input</div>
          )}

          <DatePicker
            htmlFor="start-date"
            label="Start Date"
            handlerFunc={(e) => setStartDate(e.target.value)}
          />
          {(!startDate || !isStartDateCorrect) && isButtonSaveClicked && (
            <div className="invalid-input">Invalid input</div>
          )}

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            {!street && isButtonSaveClicked && (
              <div className="invalid-input">Invalid input</div>
            )}

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              onChange={(e) => setCity(e.target.value)}
              required
            />
            {!city && isButtonSaveClicked && (
              <div className="invalid-input">Invalid input</div>
            )}

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
            {!state && isButtonSaveClicked && (
              <div className="invalid-input">Invalid input</div>
            )}

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
            {!zipCode && isButtonSaveClicked && (
              <div className="invalid-input">Invalid input</div>
            )}
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
          {!department && isButtonSaveClicked && (
            <div className="invalid-input">Invalid input</div>
          )}
        </form>

        <button className="button-save" type="button" onClick={handleSave}>
          Save
        </button>

        <Modal message="Employee Created!" handleClose={handleCloseModal} />
      </div>
    </>
  );
};

export default CreateEmployee;
