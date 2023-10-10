import React from "react";
import styles from "../styles/HomeSkeleton.module.css"; // Import your CSS module

function HomeSkeleton() {
  return (
    <div className={styles["main-item"]}>
      <div className={styles["animated-background"]}>
        <div className={styles["background-masker"]}></div>
      </div>

      <div className={styles["shared-dom"]}>
        <div className={styles["sub-rect"] + " " + styles["pure-background"]}></div>
      </div>
    </div>
  );
}

export default HomeSkeleton;
