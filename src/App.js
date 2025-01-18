import "./styles.css";
import { useState, useRef } from "react";
import { GridRow } from "./components/utils";
import Calculator from "./pages/calculator";
import Currency from "./pages/currency";
import More from "./pages/more";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="App">
      <GridRow activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {activeIndex === 0 && <Calculator />}
      {activeIndex === 1 && <Currency />}
      {activeIndex === 2 && <More />}
    </form>
  );
}
