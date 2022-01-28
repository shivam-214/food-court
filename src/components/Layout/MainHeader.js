import React from "react";
import classes from "./MainHeader.module.css";
import HeaderButton from "./HeaderButton";
import mealsImg from "../../assets/meals6.jpg";

const MainHeader = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>FoodKart</h1>
        <HeaderButton onClick={props.onShowCart} />
      </header>
      <section className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of food!" />
      </section>
    </>
  );
};

export default MainHeader;
