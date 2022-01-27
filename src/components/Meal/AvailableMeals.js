import React from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = (props) => {
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {props.meals.map((meal) => {
            return <MealItem key={meal.id} meal={meal} />;
          })}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
