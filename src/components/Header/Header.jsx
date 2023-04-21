import wealthHealth from '../../assets/img/logo.jpg';

/**
 * This is defining a functional component named `Header` that takes in `props` as a parameter. The component returns a JSX element that displays the HRnet logo and title.
 * Component's Hierarchy: (CreateEmployee | ListEmployees) > Header
 * 
 * @component
 * @name Header
 * @kind function
 * @param {*} props - No props
 * @returns { JSX.Element }
 */
const Header = (props) => {
  return (
    <div className="title">
      <div className='hrnet-logo'>
        <div>
          <img
            className="logo"
            src={wealthHealth}
            width="40"
            alt="HRnet Logo"
          />
        </div>
        <h1>HRnet</h1>
      </div>
    </div>
  );
};

export default Header;
