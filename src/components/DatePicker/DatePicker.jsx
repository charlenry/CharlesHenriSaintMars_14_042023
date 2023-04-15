import "./DatePicker.scss";
import { useEffect } from "react";

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
        placeholder="yyyy-dd-mm"
        onChange={handlerFunc}
        required
      />
    </div>
  );
};

export default DatePicker;
