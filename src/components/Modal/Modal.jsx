import './Modal.scss';

const Modal = ({message, handleClose}) => {
  return (
    <div id="confirmation" className="modal">
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

export default Modal;
