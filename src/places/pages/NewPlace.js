import React, { useCallback, useReducer } from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId == action.inputId) {
          formIsValid = formIsValid && action.isvalid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isvalid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isvalid: action.isvalid },
        },
        isvalid: formIsValid,
      };
    default:
      return state;
  }
};

function NewPlace(props) {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isvalid: false,
      },
      description: {
        value: "",
        isvalid: false,
      },
    },
    isvalid: false,
  });
  const InputHandler = useCallback((id, value, isvalid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isvalid: isvalid,
      inputId: id,
    });
  }, []);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title!"
        onInput={InputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={InputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address!"
        onInput={InputHandler}
      />
      <Button type="submit" disabled={!formState.isvalid}>
        ADD PLACE
      </Button>
    </form>
  );
}

export default NewPlace;
