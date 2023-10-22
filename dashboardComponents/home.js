// Pravin Mark Jayasinghe
// 8/10/2023
// home.js
// home page with multiple interactive components
// still under construction -> will be completed once backend code is working
// Priya
//10/10/2023
//added the loading part
import React, { useState, useEffect } from "react";
import HomeSkeleton from "./HomeSkeleton";
function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading data (remove this in your actual app)
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the delay
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <div>
      {isLoading ? (
        <HomeSkeleton /> // Display the skeleton component while loading
      ) : (
        <div>
          <div>
            <h1>Hello User</h1>
          </div>
          <div>Get started by uploading your data</div>
          {/* Your interactive components can go here */}
        </div>
      )}
    </div>
  );
}

export default Home;
