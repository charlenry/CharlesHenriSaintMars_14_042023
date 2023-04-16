export const createEmployee = (employee) => async (dispatch) => {
  dispatch({
    type: "EMPLOYEE_CREATED",
    payload: employee,
  });
};

export const setButtonSaveClicked = () => async (dispatch) => {
  dispatch({
    type: "BUTTON_SAVED_CLICKED",
  });
};

// Reset the isButtonSaveClicked and isEmployeeCreated properties of the redux state
export const resetFlags = () => async (dispatch) => {
  dispatch({
    type: "RESET_FLAGS",
  });
};

export const selectEmployees = (query) => async (dispatch) => {
  dispatch({
    type: "SELECT_EMPLOYEES",
    payload: query,
  });
};

