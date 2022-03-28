import "./App.css";
import CountToggle from "./UseReducer/CountToggle";
import Counter from "./UseState/Counter";
import Input from "./UseState/Input";

function App() {
  return (
    <div className="App">
      <Counter></Counter>
      <Input />
      <CountToggle />
    </div>
  );
}

export default App;
