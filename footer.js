
import styles from "@/styles/Dashboard.module.css";
function Footer() {
  
return (
    <footer className="bg-dark text-center text-lg-start mt-5">
      <div className="container p-3">
      <p className={`${styles['footer-text']} footer-text text-center`}>&copy; 2023 SociaLens. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
