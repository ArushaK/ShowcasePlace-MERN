import "./App.css";
import ToggleC from "./UseCallback/ToggleC";
import Auth from "./UseContext/Auth";
import Api from "./UseEffect/Api";
import ParentChild from "./UseImperativeHandler/ParentChild";
import Change from "./UseLayoutEffect/Change";
import Toggle from "./UseMemo/Toggle";
import CountToggle from "./UseReducer/CountToggle";
import ChangeName from "./UseRef/ChangeName";
import Counter from "./UseState/Counter";
import Input from "./UseState/Input";

function App() {
  return (
    <div className="App">
      <Counter></Counter>
      {/* <Input /> */}
      {/* <CountToggle /> */}
      {/* <Api /> */}
      {/* <ChangeName /> */}
      {/* <Change /> */}
      {/* <ParentChild /> */}
      {/* <Auth /> */}
      {/* <Toggle /> */}
      {/* <ToggleC /> */}
    </div>
  );
}

export default App;
