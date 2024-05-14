import React from "react";
import "./styles/Footer.css";

const Footer = () => {
    const today = new Date(); 
    return (
        <footer>
            Copyright &copy; {today.getFullYear()} Simplified Recalls
        </footer>
    );
};

export default Footer;
