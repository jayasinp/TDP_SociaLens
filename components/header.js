// Pravin Mark Jayasinghe
// 5/10/2023
// header.js
// This is the header component SociaLens.
// It is a simple header with a logout function that returns the user to the login page.
// This logout function will end the session for the user.

function Header() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-danger">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          SociaLens
        </a>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
