import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./PlaceForm.css";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";

const DUMMY_PLACES = [
  {
    id: 1,
    title: "Empire State Building",
    description: "One of the most famous sky scrapers",
    imageUrl: "xyz",
    address: "20c NYC",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: 2,
    title: "Empire State Building",
    description: "One of the most famous sky scrapers",
    imageUrl: "xyz",
    address: "20c NYC",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  console.log(placeId);

  const [formState, InputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id == placeId);
  console.log(identifiedPlace);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const updatePlaceSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title!"
        onInput={InputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isvalid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={InputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isvalid}
      />
      <Button type="submit" disabled={!formState.isvalid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
