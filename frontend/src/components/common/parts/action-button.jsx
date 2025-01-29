import React from "react";
import { Link } from "react-router-dom";
import Style from "./parts.module.css";

export const ActionBtn = ({ link, children, place }) => {
  return (
    <>
      <Link
        to={link}
        className={Style.actionBtn}
        style={{ border: `${place === "homePage" ? ".2rem solid black" : ""}` }}
      >
        <button>{children}</button>{" "}
      </Link>
    </>
  );
};
