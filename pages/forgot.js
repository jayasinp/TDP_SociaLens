// Pravin Mark Jayasinghe
// 5/10/2023
// forgot.js
// This is the password reset page for SociaLens.
// It is a simple form that takes in an email address.
// It also has links to the login page.

import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Login.module.css";

function Forgot() {
  return (
    <div className={styles["container-fluid"]}>
      <div className="row">
        <div className="col text-center mt-1">
          <Link href="/">
            <Image
              src="/socialens_mono.png"
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
            <div className="card-header bg-warning text-dark text-center">
              <span>
                Reset your Socia<i>L</i>ens password
              </span>
            </div>
            <div className="card-body">
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
                <div className="mb-3">
                  <Link href="/">
                    <button type="submit" className="btn btn-warning">
                      Reset Password
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link
            href="/login"
            className="text-danger"
            style={{ textDecoration: "none" }}
          >
            Go back to login.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
