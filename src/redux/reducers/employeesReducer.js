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
  let resultSelect, resultSort;

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
      if (action.payload.column === "firstName" && action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.firstName.toLowerCase();
          let y = b.firstName.toLowerCase();
          if (x < y) {return -1;};
          if (x > y) {return 1;};
          return 0;
        });
      }
      if (action.payload.column === "firstName" && action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.firstName.toLowerCase();
          let y = b.firstName.toLowerCase();
          if (x < y) {return 1;};
          if (x > y) {return -1;};
          return 0;
        });
      }

      if (action.payload.column === "lastName" && action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.lastName.toLowerCase();
          let y = b.lastName.toLowerCase();
          if (x < y) {return -1;};
          if (x > y) {return 1;};
          return 0;
        });
      }
      if (action.payload.column === "lastName" && action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.lastName.toLowerCase();
          let y = b.lastName.toLowerCase();
          if (x < y) {return 1;};
          if (x > y) {return -1;};
          return 0;
        });
      }

      if (action.payload.column === "startDate" && action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.startDate.toLowerCase();
          let y = b.startDate.toLowerCase();
          if (x < y) {return -1;};
          if (x > y) {return 1;};
          return 0;
        });
      }
      if (action.payload.column === "startDate" && action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.startDate.toLowerCase();
          let y = b.startDate.toLowerCase();
          if (x < y) {return 1;};
          if (x > y) {return -1;};
          return 0;
        });
      }

      if (action.payload.column === "department" && action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.department.toLowerCase();
          let y = b.department.toLowerCase();
          if (x < y) {return -1;};
          if (x > y) {return 1;};
          return 0;
        });
      }
      if (action.payload.column === "department" && action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.department.toLowerCase();
          let y = b.department.toLowerCase();
          if (x < y) {return 1;};
          if (x > y) {return -1;};
          return 0;
        });
      }

      if (action.payload.column === "dateOfBirth" && action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.dateOfBirth.toLowerCase();
          let y = b.dateOfBirth.toLowerCase();
          if (x < y) {return -1;};
          if (x > y) {return 1;};
          return 0;
        });
      }
      if (action.payload.column === "dateOfBirth" && action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.dateOfBirth.toLowerCase();
          let y = b.dateOfBirth.toLowerCase();
          if (x < y) {return 1;};
          if (x > y) {return -1;};
          return 0;
        });
      }

      if (action.payload.column === "street" && action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.street.toLowerCase();
          let y = b.street.toLowerCase();
          if (x < y) {return -1;};
          if (x > y) {return 1;};
          return 0;
        });
      }
      if (action.payload.column === "street" && action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.street.toLowerCase();
          let y = b.street.toLowerCase();
          if (x < y) {return 1;};
          if (x > y) {return -1;};
          return 0;
        });
      }

      if (action.payload.column === "city" && action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.city.toLowerCase();
          let y = b.city.toLowerCase();
          if (x < y) {return -1;};
          if (x > y) {return 1;};
          return 0;
        });
      }
      if (action.payload.column === "city" && action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.city.toLowerCase();
          let y = b.city.toLowerCase();
          if (x < y) {return 1;};
          if (x > y) {return -1;};
          return 0;
        });
      }

      if (action.payload.column === "state" && action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.state.toLowerCase();
          let y = b.state.toLowerCase();
          if (x < y) {return -1;};
          if (x > y) {return 1;};
          return 0;
        });
      }
      if (action.payload.column === "state" && action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => {
          let x = a.state.toLowerCase();
          let y = b.state.toLowerCase();
          if (x < y) {return 1;};
          if (x > y) {return -1;};
          return 0;
        });
      }
      return {
        ...state,
        rdxEmployees: [...resultSort],
      };
    case "SORT_NUMBER":
      if (action.payload.column === "zipCode" && action.payload.order === "asc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => a.zipCode - b.zipCode);
      }
      if (action.payload.column === "zipCode" && action.payload.order === "desc") {
        resultSort = Array.from(state.rdxEmployees).sort((a,b) => b.zipCode - a.zipCode);
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
