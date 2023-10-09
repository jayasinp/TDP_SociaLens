// Pravin Mark Jayasinghe
// 5/10/2023
// header.js
// This is the header component SociaLens.
// It is a simple header with a logout function that returns the user to the login page.
// This logout function will end the session for the user.
// Logout function (9/10/2023)
// Priya
// 9/10/2023
// added logout function
import { useRouter } from "next/router"; // Import the Next.js router
function Header() {
  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    // clear the user's session
    localStorage.removeItem("token"); // Replace "token" with your actual token name

    // After performing logout actions, redirect the user to the login page.
    router.push("/login");
  };
  return (
    <nav className="navbar navbar-expand navbar-dark bg-danger">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/socialens_monodark.png"
            alt="Logo"
            width="230"
            height="60"
          />
        </a>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
