import "./styles.css";
import { evaluate } from "mathjs";
import { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [num, setNum] = useState(0);
  const [history, setHistory] = useState([]);

  const clearDisplay = () => {
    setNum("");
    setInput(0);
  };

  const evaluateInput = () => {
    if (!input.trim()) return;

    try {
      // Use the evaluate function from Math.js
      let newStr = input
        .replace(/([+\*/%]){2,}/g, (match) => match.slice(-1))
        // Handle repeated non-`-` operators
        .replace(/(\*|\/|%)\-+([+\*/%])/g, "$2");
      // Handle cases like `*-+` or `/--+`

      const evaluation = evaluate(newStr);
      setInput((prev) => prev + "=" + evaluation);
      setNum((prev) => evaluation);
    } catch (error) {
      setInput("Invalid Operation");
    }
  };

  const operations = {
    AC: () => clearDisplay(),
    "=": () => evaluateInput(),
  };

  const validateAndFixExpression = (expression) => {
    // Remove unnecessary spaces

    let newStr = expression.replace(/^0+(?=\d)/, "");
    newStr = newStr.replace(/(\d*\.\d*)\.+/, "$1");

    return newStr;
  };

  const handleClick = (event) => {
    const value = event.target.value;
    if (!value) return;

    setNum((prev) => value);
    if (value in operations) {
      operations[value]();
      return;
    }

    setInput((prev) => {
      return validateAndFixExpression(prev + value);
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="App">
      <GridRow />
      <Display input={input} value={num} />
      <Buttons changeInput={handleClick} />
    </form>
  );
};

function Icon(props) {
  return <i className={"fa-solid fa-equals"}></i>;
}

const Display = ({ input, value }) => {
  return (
    <div className="display">
      <span id="display">{input}</span>
      <span>{value}</span>
    </div>
  );
};

const Buttons = ({ changeInput }) => {
  return (
    <div className="container" onClick={changeInput}>
      <div className="row">
        <button id="clear" value="AC" className="operator-btn clear-btn">
          AC
        </button>
        <button value="%" className="operator-btn">
          %
        </button>
        <button id="divide" value="/" className="operator-btn">
          &divide;
        </button>{" "}
        {/* "÷" symbol for division */}
      </div>
      <div className="row">
        <button id="seven" value="7">
          7
        </button>
        <button id="eight" value="8">
          8
        </button>
        <button id="nine" value="9">
          9
        </button>
        <button id="multiply" value="*" className="operator-btn">
          *
        </button>{" "}
        {/* "×" symbol for multiplication */}
      </div>
      <div className="row">
        <button id="four" value="4">
          4
        </button>
        <button id="five" value="5">
          5
        </button>
        <button id="six" value="6">
          6
        </button>
        <button id="subtract" value="-" className="operator-btn">
          &ndash;
        </button>{" "}
        {/* "−" symbol for subtraction */}
      </div>
      <div className="row">
        <button id="one" value="1">
          1
        </button>
        <button id="two" value="2">
          2
        </button>
        <button id="three" value="3">
          3
        </button>
        <button id="add" value="+" className="operator-btn">
          &#43;
        </button>{" "}
        {/* "+" symbol for addition */}
      </div>
      <div className="row">
        <button id="zero" value="0" className="zero">
          0
        </button>
        <button id="decimal" value=".">
          .
        </button>{" "}
        {/* Decimal point */}
        <button id="equals" value="=" className="operator-btn">
          =
        </button>
      </div>
    </div>
  );
};

const GridRow = () => {
  return (
    <div className="grid-row">
      <button className="grid-button">
        <Icon className="fa-solid fa-equals" /> {/* Equal icon */}
        Home
      </button>
      <button className="grid-button">
        <Icon className="fa fa-th" /> {/* Grid icon */}
        More
      </button>
      <button className="grid-button">
        <Icon className="fa fa-dollar" /> {/* Dollar icon */}
        Currency
      </button>
    </div>
  );
};

export default function App() {
  return <Calculator />;
}
