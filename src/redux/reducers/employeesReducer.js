import { employees } from "../../data/employees";
import { departments } from "../../data/departments";
import { states } from "../../data/states";

const INITIAL_STATE = {
  rdxEmployees: [...employees],
  rdxDepartments: [...departments],
  rdxStates: [...states],
  isButtonSaveClicked: false,
  isEmployeeCreated: false,
};

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "EMPLOYEE_CREATED":
      employees.push(action.payload);
      return {
        ...state,
        rdxEmployees: [...employees],
        isEmployeeCreated: true,
      };
    case "BUTTON_SAVED_CLICKED":
      return {
        ...state,
        isButtonSaveClicked: true,
      };
    case "RESET_FLAGS":
      return {
        ...state,
        isButtonSaveClicked: false,
        isEmployeeCreated: false,
      };
    case "SELECT_EMPLOYEES":
      const resultByFirstName = employees.filter((employee) =>
        employee.firstName.toLowerCase().includes(action.payload.toLowerCase())
      );
      const resultByLastName = employees.filter((employee) =>
        employee.lastName.toLowerCase().includes(action.payload.toLowerCase())
      );
      const resultByDateOfBirth = employees.filter((employee) =>
        employee.dateOfBirth.toLowerCase().includes(action.payload.toLowerCase())
      );
      const resultByStartDate = employees.filter((employee) =>
        employee.startDate.toLowerCase().includes(action.payload.toLowerCase())
      );
      const resultByDepartment = employees.filter((employee) =>
        employee.department.toLowerCase().includes(action.payload.toLowerCase())
      );
      const resultByStreet = employees.filter((employee) =>
        employee.street.toLowerCase().includes(action.payload.toLowerCase())
      );
      const resultByCity = employees.filter((employee) =>
        employee.city.toLowerCase().includes(action.payload.toLowerCase())
      );
      const resultByState = employees.filter((employee) =>
        employee.state.toLowerCase().includes(action.payload.toLowerCase())
      );
      const resultByZipCode = employees.filter((employee) =>
        employee.zipCode.toLowerCase().includes(action.payload.toLowerCase())
      );
      let result = resultByFirstName.concat(
        resultByLastName,
        resultByDateOfBirth,
        resultByStartDate,
        resultByDepartment,
        resultByStreet,
        resultByCity,
        resultByState,
        resultByZipCode
      );
      result = [...new Set(result)];
      return {
        ...state,
        rdxEmployees: [...result],
      };
    default:
      return state;
  }
};

export default employeesReducer;
