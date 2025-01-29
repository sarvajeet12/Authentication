import React from "react";
import Style from "./navbar.module.css";
// import { imageAssets } from "../../../assets/js/image-assets";
import { ActionBtn } from "../parts/action-button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  }


  return (
    <div className={Style.navbar}>
      <div onClick={() => handleNavigate()}>
        <span>A</span>
        <span>UTH</span>
      </div>
      <div>
        <ActionBtn link={"/login"}>Login</ActionBtn>{" "}
      </div>
    </div>
  );
};

export default Navbar;
