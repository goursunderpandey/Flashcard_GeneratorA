import React from "react";
import { NavLink as Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="py-5 mt-1">
      <h1 className="text-4xl font-bold mb-6 text-Black focus:outline-red-400">
        Create Flashcard
      </h1>
      <div className="flex items-center space-x-10 mb-3">
        <button className="text-lg font-semibold text-black-600">
          <Link
            to={"/"}
          >
            Create New
          </Link>
        </button>
        <button className="text-lg font-semibold text-black-600">
          <Link
            to={"/myflashcard"}
          >
            My Flashcard
          </Link>
        </button>
      </div>
      <hr className="border bg-black-700 border-gray-300 mb-8" />
    </div>
  );
};

export default Navbar;
