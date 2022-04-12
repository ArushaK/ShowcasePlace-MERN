import React, { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
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

  const loginHandler = (event) => {
    event.preventDefault();
    console.log("Logged In.");
    auth.login();
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

  return (
    <Card className="authentication">
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
  );
};

export default Auth;
