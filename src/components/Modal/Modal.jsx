import './Modal.scss';
import PropTypes from "prop-types";

/**
 * This is defining a functional component called `Modal` that takes in two props, `message` and `handleClose`, using destructuring syntax. The component returns a JSX element that renders a modal with a message and a close button.
 * Component's Hierarchy: CreateEmployee > Modal
 * 
 * @component
 * @name Modal
 * @kind function
 * @param {string} message - The message to display in the modal
 * @param {callback} handleClose - The callback that handles the close button of the modal
 * @returns { JSX.Element }
 */
const Modal = ({message, handleClose}) => {
  return (
    <div id="modalId" className="modal">
      <div className="modal-content">
        {/* Modal content */}
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

// PropTypes
Modal.propTypes = {
  message: PropTypes.string,
  handleClose: PropTypes.func,
};

export default Modal;
