import React, { useEffect, useState } from "react";
 // Initialize state for the current mode (light or dark)
const Dark = () => {
    let getTheme = () => {
        return JSON.parse(localStorage.getItem("theme"));
    }
    const [theme, SetTheme] = useState(getTheme());


  // Add an event listener to update the mode when the user toggles it
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", JSON.stringify(theme))
    }, [theme])
    const Change = () => {
        theme === "dark-theme" ? SetTheme("light-theme") : SetTheme("dark-theme")
  
    };
      // Render the app with the appropriate styles based on the current mode
    return (
        <div>
            <div className="toggle">
                <input onClick={Change} type="checkbox" id="toggle" />
                <label htmlFor="toggle"></label>
            </div>
        </div>
    );
};

export default Dark;