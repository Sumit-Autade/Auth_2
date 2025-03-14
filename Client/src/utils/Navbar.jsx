import React from "react";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  return (
    <nav className="rounded-lg bg-gradient-to-r bg-blue-100 text-white p-4 flex items-center justify-between shadow-xl">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Logo" className="h-12 w-auto rounded-md shadow-md" />
        <span className="text-2xl font-bold tracking-wide"></span>
      </div>
    </nav>
  );
};

export default Navbar;
