import React, { Fragment, useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import MainHeader from "./components/Layout/MainHeader";
import MealsSummary from "./components/Meal/MealsSummary";
import AvailableMeals from "./components/Meal/AvailableMeals";
import Cart from "./components/Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui";
import { fetchCartData } from "./store/cart-actions";

const App = () => {
  const dispatch = useDispatch();

  const [meals, setMeals] = useState([]);
  const isShowCart = useSelector((state) => state.ui.isShowCart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  const showCartHandler = () => {
    dispatch(uiActions.showCart());
  };

  const closeCartHandler = () => {
    dispatch(uiActions.closeCart());
  };

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const mealData = (mealObject) => {
      let loadedMeals = [];

      for (const id in mealObject) {
        const meal = {
          id: id,
          name: mealObject[id].name,
          description: mealObject[id].description,
          price: mealObject[id].price,
        };
        loadedMeals.push(meal);
      }
      setMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: "https://react-food-order-17525-default-rtdb.firebaseio.com/meals.json",
      },
      mealData
    );
  }, [fetchMeals]);

  let content = <p>Found no meals.</p>;
  if (error) {
    content = (
      <p style={{ textAlign: "center", color: "red" }}>
        There is an error occured while fetching meals data!
      </p>
    );
  }

  if (isLoading) {
    content = (
      <p style={{ textAlign: "center", color: "white" }}> Loading...</p>
    );
  }

  if (meals.length > 0) {
    content = <AvailableMeals meals={meals} />;
  }

  return (
    <Fragment>
      {isShowCart && <Cart onClose={closeCartHandler} />}
      <MainHeader onShowCart={showCartHandler} />
      <main>
        <MealsSummary />
        {content}
      </main>
    </Fragment>
  );
};

export default App;
