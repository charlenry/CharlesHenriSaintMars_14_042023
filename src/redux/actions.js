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


/* 
* column : column to sort
* order : asc or desc
* type : type of data to sort (string, date or number)
*/
export const sort = (column, order, type) => async (dispatch) => {
  if (type === "string" || type === "date") {
    dispatch({
      type: "SORT_STRING-DATE",
      payload: {
        column: column,
        order: order,
      },
    });
  }

  if (type === "number") {
    dispatch({
      type: "SORT_NUMBER",
      payload: {
        column: column,
        order: order,
      },
    });
  }
  
};

