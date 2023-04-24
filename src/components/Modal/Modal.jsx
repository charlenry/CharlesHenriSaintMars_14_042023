import './Modal.scss';
import PropTypes from "prop-types";

/**
 * This is defining a functional component called <b>Modal</b> that takes in three props,<b>displayState</b>, <b>handleClose</b> and <b>message</b> using destructuring syntax. The component returns a JSX element that renders a modal with a message and a close button.
 * 
 * This modal component can be style in the Modal.scss file.
 * 
 * Usage :
 * \<Modal
 *   displayState={modalDisplayState}
 *   handleClose={handleCloseModal}
 *   message="Employee Created!"
 * />
 * 
 * Component's Hierarchy: CreateEmployee > Modal
 * 
 * @component
 * @name Modal
 * @kind function
 * @param {string} displayState - The open or closed state of the modal. It can be manage with a local state like in the example above. The two values are <b>block</b> and <b>none</b>. The modal is Hidden by default.
 * @param {callback} handleClose - The callback that handles the close button of the modal
 * @param {string} message - The message to display in the modal
 * @returns { JSX.Element }
 */
const Modal = ({displayState, handleClose, message}) => {
  return (
    <div className="modal" style={{display: displayState}}>
      <div className="modal-content">
        {/* Modal content */}
        <span className="close-button" onClick={handleClose}>
          &times;
        </span>
        <p className="modal-message">{message}</p>
      </div>
    </div>
  );
};

// PropTypes
Modal.propTypes = {
  displayState: PropTypes.string,
  handleClose: PropTypes.func,
  message: PropTypes.string,
};

export default Modal;
