// import { useDispatch } from "react-redux/es/exports"


export const createEmployee = (employee) => async (dispatch) => {
  dispatch({
    type: 'EMPLOYEE_CREATED',
    payload: employee,
  })
}


export const setButtonSaveClicked = () => async (dispatch) => {
  dispatch({
    type: 'BUTTON_SAVED_CLICKED',
  })
}

export const resetFlags = () => async (dispatch) => {
  dispatch({
    type: 'RESET_FLAGS',
  })
}