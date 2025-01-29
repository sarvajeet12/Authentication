import React from "react";
import { ActionBtn } from "../components/common/parts/action-button";
import Style from "../components/core/home-page/home-page.module.css";

const Home = () => {
  return (
    <main className={Style.homePage}>
      <h2>Hey Developer</h2>
      <h1>Welcome to our app</h1>
      <p>
        Let's start with a quick product tour and we will have you up and
        running in no time
      </p>
      <ActionBtn place={"homePage"}>Get Started</ActionBtn>
    </main>
  );
};

export default Home;
