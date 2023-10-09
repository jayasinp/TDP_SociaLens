// footer 
// Priya and Dhruvi
//9/10/2023
//covers the gap between side bar and footer
import styles from "@/styles/Dashboard.module.css";
function Footer() {
  
return (
    <div className={`${styles['max-width']} max-width bg-dark text-center text-lg-start container p-3 m-0`} >
      <div className={`${styles['footer-text']} footer-text text-center max-width`}>&copy; 2023 SociaLens. All rights reserved.</div>
    </div> 
  );
}

export default Footer;
