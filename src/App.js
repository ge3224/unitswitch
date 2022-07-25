// import "./App.css";
import { useState } from "react";
import { unitList } from "./components/Units";
import { useCustomMapping } from "./components/useCustomMapping";
import UserInput from "./components/UserInput";
import Inches from "./components/Inches";
import Pixels from "./components/Pixels";
import Rems from "./components/Rems";
import Ems from "./components/Ems";
import Tailwind from "./components/Tailwind";
import Bootstrap from "./components/Bootstrap";
import Millimetres from "./components/Millimetres";
import Centimetres from "./components/Centimetres";
import Feet from "./components/Feet";
import Picas from "./components/Picas";
import Points from "./components/Points";

export default function App() {

  const keyMappings = ["p", "r", "e", "t", "b", "i", "m", "c", "f", "s", "o"];
  const [val, setVal] = useState(0)
  const [uni, setUni] = useState(unitList[0])

  const onUserInput = (value, unit) => {
    setVal(value)
    setUni(unit)
  }

  const onHotKeyPress = (e) => {
   switch (e.key) {
     case "p":
       console.log(`pixels ${e.key}`);
       break;
     case "r":
       console.log(`rems ${e.key}`);
       break;
     case "e":
       console.log(`ems ${e.key}`);
       break;
     case "t":
       console.log(`Tailwind ${e.key}`);
       break;
     case "b":
       console.log(`Bootstrap ${e.key}`);
       break;
     case "i":
       console.log(`inches ${e.key}`);
       break;
     case "m":
       console.log(`millimetres ${e.key}`);
       break;
     case "c":
       console.log(`centimetres ${e.key}`);
       break;
     case "f":
       console.log(`feet ${e.key}`);
       break;
     case "s":
       console.log(`picas ${e.key}`);
       break;
     case "o":
       console.log(`points ${e.key}`);
       break;
     default: // do nothing
   }
  }

  useCustomMapping(" ", keyMappings, onHotKeyPress);

  return (
    <div>
      <UserInput units={unitList} onEnter={onUserInput} />
      <Pixels value={val} unit={uni} />
      <Rems value={val} unit={uni} />
      <Ems value={val} unit={uni} />
      <Tailwind value={val} unit={uni} />
      <Bootstrap value={val} unit={uni} />
      <Inches value={val} unit={uni} />
      <Millimetres value={val} unit={uni} />
      <Centimetres value={val} unit={uni} />
      <Feet value={val} unit={uni} />
      <Picas value={val} unit={uni} />
      <Points value={val} unit={uni} />
    </div>
  );
}

// export default function App() {
//   return (
//     <div className="App">
//         <p>Hello, world!</p>
//     </div>
//   );
// }
