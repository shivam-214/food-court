import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const notIsEmpty = (value) => value.trim() !== "";
const isSixChar = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    hasError: nameInputHasError,
    inputValueChangeHandler: nameValueChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetEnteredName,
  } = useInput(notIsEmpty);

  const {
    value: enteredStreet,
    valueIsValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    inputValueChangeHandler: streetValueChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetEnteredStreet,
  } = useInput(notIsEmpty);

  const {
    value: enteredCity,
    valueIsValid: enteredCityIsValid,
    hasError: cityInputHasError,
    inputValueChangeHandler: cityValueChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetEnteredCity,
  } = useInput(notIsEmpty);

  const {
    value: enteredPostalCode,
    valueIsValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    inputValueChangeHandler: postalCodeValueChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCode,
  } = useInput(isSixChar);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });

    resetEnteredName();
    resetEnteredCity();
    resetEnteredStreet();
    resetPostalCode();
  };

  const nameControlClasses = `${classes.control} ${
    !nameInputHasError ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    !streetInputHasError ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !postalCodeInputHasError ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    !cityInputHasError ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.form}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameValueChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameInputHasError && <p>Name is not valid!</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={enteredStreet}
            onChange={streetValueChangeHandler}
            onBlur={streetBlurHandler}
          />
          {streetInputHasError && <p>Street is not valid!</p>}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            value={enteredPostalCode}
            onChange={postalCodeValueChangeHandler}
            onBlur={postalCodeBlurHandler}
          />
          {postalCodeInputHasError && <p>Postal-Code should be of 6-digit!</p>}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={enteredCity}
            onChange={cityValueChangeHandler}
            onBlur={cityBlurHandler}
          />
          {cityInputHasError && <p>City is not valid!</p>}
        </div>
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={classes.submit}
          disabled={!formIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
