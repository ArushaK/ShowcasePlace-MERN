import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <div>
      {count}
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
