// Pravin Mark Jayasinghe
// 5/10/2023
// register.js
// This is the register page for SociaLens.
// It is a simple form that takes in a name, email address and password.
// It also has links to the login page.

import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Login.module.css";

function Register() {
  return (
    <div className={styles["container-fluid"]}>
      <div className="row">
        <div className="col text-center mt-1">
          <Link href="/">
            <Image
              src="/socialens_col.png"
              alt="Socialens Logo"
              width={500}
              height={120}
              priority
            />
          </Link>
        </div>
      </div>
      <br></br>
      <div className="row justify-content-center">
        <div className="col-sm-6 col-md-6 col-lg-6">
          <div className="card">
            <div className="card-header bg-danger text-white text-center">
              <span>
                Register a Socia<i>L</i>ens account
              </span>
            </div>
            <div className="card-body mb-3">
              <form className="form-floating mb-3">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="confirmpassword"
                    placeholder="Confirm Password"
                  />
                  <label for="floatingPassword">Confirm Password</label>
                </div>
                <div className="mb-3">
                  <Link href="/dashboard">
                    <button type="submit" className="btn btn-danger">
                      Register Account
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <Link
            href="/login"
            className="text-danger"
            style={{ textDecoration: "none" }}
          >
            Already have an account? Login here.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
