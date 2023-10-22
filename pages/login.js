// Pravin Mark Jayasinghe
// 5/10/2023
// login.js
// This is the login page for SociaLens.
// It is a simple form that takes in an email address and password.
// It also has links to the register and forgot password pages.

import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Login.module.css";

function Login() {
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
                Log in to Socia<i>L</i>ens
              </span>
            </div>
            <div className="card-body">
              <form className="form-floating mb-3">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="mb-3">
                  <Link href="/dashboard">
                    <button type="submit" className="btn btn-danger">
                      Log In
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link
            href="/forgot"
            className="text-danger"
            style={{ textDecoration: "none" }}
          >
            Forgot your password?
          </Link>
        </div>
        <div className="text-center mt-3">
          <Link
            href="/register"
            className="text-danger"
            style={{ textDecoration: "none" }}
          >
            Don't have an account? Register here.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
