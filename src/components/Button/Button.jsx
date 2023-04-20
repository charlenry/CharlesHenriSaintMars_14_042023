import './Button.scss';

const Button = (props) => {
  return (
    <button
      className="page-number"
      onClick={props.click}
      style={props.isSelected ? { opacity: 1 } : { opacity: 0.7 }}
    >
      {props.children}
    </button>
  );
};

export default Button;
