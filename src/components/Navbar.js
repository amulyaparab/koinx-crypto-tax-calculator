import logo from "../assets/images/logo.svg";
const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="KoinX" />
      <div className="nav-pills">
        <p>Features</p>
        <p>Exchanges</p>
        <p>How it Works?</p>
        <p>Blog</p>
        <p>About Us</p>
        <button>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
