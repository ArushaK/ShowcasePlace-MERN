import React from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";

function NewPlace(props) {
  const [formState, InputHandler] = useForm(
    {
      title: {
        value: "",
        isvalid: false,
      },
      description: {
        value: "",
        isvalid: false,
      },
      address: {
        value: "",
        isvalid: false,
      },
    },
    false
  );

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