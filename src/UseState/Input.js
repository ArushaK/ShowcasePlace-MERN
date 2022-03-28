import React, { useState } from "react";

function Input() {
  const [input, setInput] = useState("");
  function onChange(event) {
    let newValue = event.target.value;
    setInput(newValue);
  }
  return (
    <div>
      <input placeholder="Enter Something" onChange={onChange} />
      {input}
    </div>
  );
}

export default Input;
