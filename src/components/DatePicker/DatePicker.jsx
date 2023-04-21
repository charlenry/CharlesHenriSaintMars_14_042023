import "./DatePicker.scss";
import { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * This is defining a functional component called `DatePicker` that takes in three props: `htmlFor`, `label`, and `handlerFunc`. These props are destructured from the props object passed to the component.
 * It allows a user to choose a date in a calendar. Most of browsers support this date picker. For those who do not support it, the user can enter the date himself in YYYY-MM-DD format.
 * Component's Hierarchy: CreateEmployee > DatePicker
 * 
 * @component
 * @name DatePicker
 * @kind function
 * @param {string} htmlFor - The content of the attribute htmlFor
 * @param {string} label - The content of the label element
 * @param {callback} handlerFunc - The callback that handles the user's choice for a date
 * @returns { JSX.Element }
 */
const DatePicker = ({ htmlFor, label, handlerFunc }) => {
  useEffect(() => {
    const date = document.querySelector(`#${htmlFor}`);

    try {
      date.type = "date";
    } catch (e) {
      return;
    }
  });

  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        id={htmlFor}
        type="text"
        placeholder="YYYY-MM-DD"
        onChange={handlerFunc}
        required
      />
    </div>
  );
};

// PropTypes
DatePicker.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  handlerFunc: PropTypes.func,
};

export default DatePicker;
