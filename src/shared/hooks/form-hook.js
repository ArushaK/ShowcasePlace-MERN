import React, { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
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
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isvalid: initialFormValidity,
  });

  const InputHandler = useCallback((id, value, isvalid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isvalid: isvalid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, InputHandler, setFormData];
};

export default useForm;
