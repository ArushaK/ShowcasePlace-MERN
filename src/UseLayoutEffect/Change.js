import React, { useLayoutEffect, useEffect, useRef } from "react";

function Change(props) {
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    console.log(inputRef.current.value);
  }, []);

  useEffect(() => {
    inputRef.current.value = "Arusha";
  }, []);

  return (
    <div className="App">
      <input ref={inputRef} value="HELLO" style={{ width: 400, height: 60 }} />
    </div>
  );
}

export default Change;
