import React from "react";

const Header = ({ handleToggle, showSearch }) => {
  return (
    <div>
      <div className="header bg-deep-blue flex justify-between items-center">
        <div className="logo max-w-[80px] m-4">
          <img className="max-w-[100%]" src="assets/logo.jpg" alt="" />
        </div>
        <div className="name font-poppins font-bold text-2xl">
          MY DICTIONARY APP
        </div>
        <div className="btn m-4">
          <button
            className="font-bold p-2 bg-red rounded-lg transition hover:bg-yellow"
            id="historybtn"
            type="button"
            onClick={handleToggle}
          >
            {showSearch ? "HISTORY" : "SEARCH"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
