import { useState } from "react";
import "./App.css";
function App() {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [operation, setOperation] = useState(null);

  function appendNumber(number) {
    if (number === "." && current.includes(".")) return;
    setCurrent(current + number);
  }

  function chooseOperation(op) {
    if (current === "") return;
    if (previous !== "") {
      calculate();
    }
    setOperation(op);
    setPrevious(current);
    setCurrent("");
  }

  function calculate() {
    let result;

    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "÷":
        result = prev / curr;
        break;
      default:
        return;
    }

    setCurrent(result.toString());
    setOperation(null);
    setPrevious("");
  }

  function clear() {
    setCurrent("");
    setPrevious("");
    setOperation(null);
  }

  function deleteDigit() {
    setCurrent(current.slice(0, -1));
  }

  return (
    <div style={styles.calculator}>
      <div style={styles.display}>
        <div>
          {previous} {operation}
        </div>
        <div>{current || "0"}</div>
      </div>

      <button onClick={clear}>AC</button>
      <button onClick={deleteDigit}>DEL</button>
      <button onClick={() => chooseOperation("÷")}>÷</button>
      <button onClick={() => chooseOperation("*")}>*</button>

      <button onClick={() => appendNumber("7")}>7</button>
      <button onClick={() => appendNumber("8")}>8</button>
      <button onClick={() => appendNumber("9")}>9</button>
      <button onClick={() => chooseOperation("-")}>-</button>

      <button onClick={() => appendNumber("4")}>4</button>
      <button onClick={() => appendNumber("5")}>5</button>
      <button onClick={() => appendNumber("6")}>6</button>
      <button onClick={() => chooseOperation("+")}>+</button>

      <button onClick={() => appendNumber("1")}>1</button>
      <button onClick={() => appendNumber("2")}>2</button>
      <button onClick={() => appendNumber("3")}>3</button>
      <button onClick={calculate} style={styles.equals}>
        =
      </button>

      <button onClick={() => appendNumber("0")} style={styles.zero}>
        0
      </button>
      <button onClick={() => appendNumber(".")}>.</button>
    </div>
  );
}

const styles = {
  calculator: {
    width: "260px",
    margin: "50px auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "5px",
    fontFamily: "Arial",
  },
  display: {
    gridColumn: "span 4",
    background: "#222",
    color: "#fff",
    padding: "10px",
    textAlign: "right",
    fontSize: "20px",
  },
  equals: {
    gridRow: "span 2",
    background: "#4caf50",
    color: "#fff",
  },
  zero: {
    gridColumn: "span 2",
  },
};

export default App;
