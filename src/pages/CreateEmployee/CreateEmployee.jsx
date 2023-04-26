import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Header/Header";
import DatePicker from "../../components/DatePicker/DatePicker";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";

/**
 * This is a functional component renders a form for creating a new employee and handles the input values and validation. It also dispatches actions to update the Redux store with the new employee data.
 * Component's Hierarchy: CreateEmployee
 *
 * @component
 * @name CreateEmployee
 * @kind function
 * @param {*} props - No props
 * @returns { JSX.Element }
 */
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
  const [department, setDepartment] = useState(rdxDepartments[0]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(rdxStates[0].abbreviation);
  const [zipCode, setZipCode] = useState("");
  const [isDateOfBirthCorrect, setIsDateOfBirthCorrect] = useState(false);
  const [isStartDateCorrect, setIsStartDateCorrect] = useState(false);
  const [modalDisplayState, setModalDisplayState] = useState("none");
  // Control of the dates from 1900 to 2999
  const [datePattern] = useState(
    /^((19[0-9]{2})|(2[0-9]{3}))-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/
  );

  useEffect(() => {
    setIsDateOfBirthCorrect(datePattern.test(dateOfBirth));
    setIsStartDateCorrect(datePattern.test(startDate));

    if (isEmployeeCreated) {
      setModalDisplayState("block");
    }
  }, [dispatch, isEmployeeCreated, datePattern, dateOfBirth, startDate]);

  /**
   * `handleSave` is a function that is called when the "Save" button is clicked. It dispatches actions to update the Redux store with the new employee data. It also handles input validation by checking if all required fields are filled out and if the date inputs match the required pattern. If any of the inputs are invalid, it prevents the default form submission behavior. If all inputs are valid, it creates a new employee object with the input values and dispatches the `createEmployee` action with the new employee object as an argument.
   *
   * @function
   * @name handleSave
   * @memberof CreateEmployee
   * @returns {void}
   */
  const handleSave = (e) => {
    import("../../redux/actions").then((action) => {
      dispatch(action.setButtonSaveClicked());
    });
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
        id: uuidv4(),
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
      import("../../redux/actions").then((action) => {
        dispatch(action.createEmployee(employee));
      });
    }
  };

  /**
   * `handleCloseModal` is a function that is called when the modal is closed. It sets the display of the confirmation modal to "none", resets the form input values, and dispatches the `resetFlags` action to update the Redux store.
   *
   * @function
   * @name handleCloseModal
   * @memberof CreateEmployee
   * @param {any} e
   * @returns {void}
   */
  const handleCloseModal = (e) => {
    // e.preventDefault();
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
    import("../../redux/actions").then((action) => {
      setModalDisplayState("none");
      dispatch(action.resetFlags());
    });
  };

  return (
    <>
      <Header />
      <div className="container bg-dark">
        <Link className="button-link" to="/list-employees">
          View Current Employees
        </Link>
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
              value={state.abbreviation}
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
            value={department}
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

        <Modal
          displayState={modalDisplayState}
          handleClose={handleCloseModal}
          message="Employee Created!"
          bgColor=""
          textColor=""
          btnColor=""
        />
      </div>
    </>
  );
};

export default CreateEmployee;



















