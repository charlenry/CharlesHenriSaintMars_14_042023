/**
 * Defining a function called `createEmployee` that takes in an `employee` parameter and returns an asynchronous function that takes in a `dispatch` parameter. When this function is called, it dispatches an action with the type "EMPLOYEE_CREATED" and the payload containing the `employee` parameter. This function is also exported to be used in other parts of the code.
 * 
 * @async
 * @function
 * @name createEmployee
 * @param {Object} employee - Data on an employee
 * @returns {Promise}
 */
export const createEmployee = (employee) => async (dispatch) => {
  dispatch({
    type: "EMPLOYEE_CREATED",
    payload: employee,
  });
};


/**
 * `setButtonSaveClicked` dispatches an action with the type "BUTTON_SAVED_CLICKED". This function is also exported to be used in other parts of the code.
 * 
 * @async
 * @function
 * @name setButtonSaveClicked
 * @returns {Promise}
 */
export const setButtonSaveClicked = () => async (dispatch) => {
  dispatch({
    type: "BUTTON_SAVED_CLICKED",
  });
};


/**
 * `resetFlags` dispatches an action with the type "RESET_FLAGS". This function is also exported to be used in other parts of the code.
 * It allows to reset the isButtonSaveClicked and isEmployeeCreated properties of the redux state.
 * 
 * @async
 * @function
 * @name resetFlags
 * @returns {Promise}
 */
export const resetFlags = () => async (dispatch) => {
  dispatch({
    type: "RESET_FLAGS",
  });
};


/**
 * `selectEmployees` dispatches an action with the type "SELECT_EMPLOYEES". This function is also exported to be used in other parts of the code.
 * 
 * @async
 * @function
 * @name selectEmployees
 * @returns {Promise}
 */
export const selectEmployees = (query) => async (dispatch) => {
  dispatch({
    type: "SELECT_EMPLOYEES",
    payload: query,
  });
};


/**
 * When this function is called, it dispatches an action with the type "SORT_STRING-DATE" or "SORT_NUMBER" depending on the `type` parameter, and the payload containing the `column` and `order` parameters. This function can be used in other parts of the code.
 * 
 * @async
 * @function
 * @name sort
 * @param {string} column - Column to sort
 * @param {string} order - The sorting order: asc or desc
 * @param {any} type - Type of data to sort (string, date or number)
 * @returns {Promise}
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

