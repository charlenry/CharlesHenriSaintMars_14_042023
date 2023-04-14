import { employees } from "../../data/employees";
import { departments } from "../../data/departments";
import { states } from "../../data/states";

const INITIAL_STATE = {
  rdxEmployees: {...employees},
  rdxDepartments: departments,
  rdxStates: states,
  isButtonSaveClicked: false,
  isEmployeeCreated: false,
};

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "EMPLOYEE_CREATED":
      employees.push(action.payload);
      return {
        ...state,
        rdxEmployees: {...employees},
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
    default:
      return state;
  }
};

export default employeesReducer;