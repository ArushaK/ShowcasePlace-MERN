import React, { useContext, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, InputHandler, setFormdata] = useForm(
    {
      email: {
        value: "",
        isvalid: false,
      },
      password: {
        value: "",
        isvalid: false,
      },
    },
    false
  );

  const loginHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    }
  };

  const signupHandler = () => {
    if (!isLogin) {
      setFormdata(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isvalid && formState.inputs.password.isvalid
      );
    } else {
      setFormdata(
        {
          ...formState.inputs,
          name: {
            value: "",
            isvalid: false,
          },
        },
        false
      );
    }
    setIsLogin((prev) => !prev);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={loginHandler}>
          {!isLogin && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a Name!"
              onInput={InputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid Email Address!"
            onInput={InputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password!"
            onInput={InputHandler}
          />
          <Button type="submit" disabled={!formState.isvalid}>
            {isLogin ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={signupHandler}>
          SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
