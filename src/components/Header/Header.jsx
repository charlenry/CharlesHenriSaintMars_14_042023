import wealthHealth from '../../assets/img/logo.jpg';
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
