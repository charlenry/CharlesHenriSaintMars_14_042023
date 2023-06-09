import { employees } from "../../data/employees";
import { departments } from "../../data/departments";
import { states } from "../../data/states";

const INITIAL_STATE = {
  rdxEmployees: [...employees],
  rdxTotalEmployees: employees.length,
  rdxDepartments: [...departments],
  rdxStates: [...states],
  isButtonSaveClicked: false,
  isEmployeeCreated: false,
};

/**
 * `employeesReducer` is defining a function that takes two parameters: `state` and `action`. The function is a reducer function that will be used to update the state of the application based on the action that is dispatched. The `state` parameter is initialized to `INITIAL_STATE` if no state is passed in.
 * 
 * @function
 * @name employeesReducer
 * @param {Object} state - The global state of the application
 * @param {Object} action - Object containing the action dispatched
 * @returns {Object}
 */
const employeesReducer = (state = INITIAL_STATE, action) => {
  let resultSelect, resultSort;

  switch (action.type) {
    case "EMPLOYEE_CREATED":
      employees.push(action.payload);
      return {
        ...state,
        rdxEmployees: [...employees],
        rdxTotalEmployees: employees.length,
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
        employee.dateOfBirth
          .toLowerCase()
          .includes(action.payload.toLowerCase())
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
      resultSelect = resultByFirstName.concat(
        resultByLastName,
        resultByDateOfBirth,
        resultByStartDate,
        resultByDepartment,
        resultByStreet,
        resultByCity,
        resultByState,
        resultByZipCode
      );
      resultSelect = [...new Set(resultSelect)];
      return {
        ...state,
        rdxEmployees: [...resultSelect],
      };
    case "SORT_STRING-DATE":
      if (action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a, b) => {
          let x = a[action.payload.column].toLowerCase();
          let y = b[action.payload.column].toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
      }

      if (action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a, b) => {
          let x = a[action.payload.column].toLowerCase();
          let y = b[action.payload.column].toLowerCase();
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        });
      }
      return {
        ...state,
        rdxEmployees: [...resultSort],
      };
    case "SORT_NUMBER":
      if (action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort(
          (a, b) => a[action.payload.column] - b[action.payload.column]
        );
      }
      if (action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort(
          (a, b) => b[action.payload.column] - a[action.payload.column]
        );
      }
      return {
        ...state,
        rdxEmployees: [...resultSort],
      };
    default:
      return state;
  }
};

export default employeesReducer;
