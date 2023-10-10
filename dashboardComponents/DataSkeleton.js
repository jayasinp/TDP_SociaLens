//Priya
//11/10/2023
//DataSkeleton.js to show the loading of components

import React from "react";
import styles from "../styles/DatasetsSkeleton.module.css"; // Import the CSS module from HomeSkeleton

function DataSkeleton() {
  return (
    <div className={styles["main-item"]}>
      <div className={styles["animated-background"]}>
        <div className={styles["background-masker"]}></div>
      </div>

      <div className={styles["shared-dom"]}>
        <div className={styles["sub-rect"] + " " + styles["pure-background"]}></div>
        <div className={styles["sub-rect"] + " " + styles["pure-background"]}></div>
        <div className={styles["sub-rect"] + " " + styles["pure-background"]}></div>
        {/* Add more divs with the same styles as needed */}
      </div>
    </div>
  );
}

export default DataSkeleton;
