"use client"
import React from "react";

const ScrollToTop = () => {
    // Function to scroll to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0, // Scroll to the top
            behavior: "smooth", // Smooth scrolling animation
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Your content here */}
            <div style={{ height: "2000px", background: "lightgray" }}>
                <p>Scroll down to see the button.</p>
            </div>

            {/* Button to scroll to the top */}
            <button
                onClick={scrollToTop}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    background: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Scroll to Top
            </button>
        </div>
    );
};

export default ScrollToTop;
