import { useState } from "react";
import "./App.css";

function App() {
  const [names, setNames] = useState("");
  const [data, setData] = useState("");
  const [result, setResult] = useState([]);

  const handleTransform = () => {
    const result = names.split("\n").map((name) => {
      const current = data.split("\n").find((item) => item.includes(name));
      if (!current) {
        return {
          name,
          result: "",
        };
      }
      try {
        // find number inside of ()
        const regex = /\(([^)]+)\)/;
        const [, result] = current.match(regex);

        return {
          name,
          result,
        };
      } catch {
        return {
          name,
          result: `${name} 입력 형식이 잘못됨. 수기로 입력 바랍니다. ${current}`,
        };
      }
    });

    setResult(result);
  };

  return (
    <div className="App">
      <textarea
        type="text"
        placeholder="이름을 순서를 복사 붙혀넣기 하세요"
        value={names}
        onChange={(e) => {
          setNames(e.target.value);
        }}
        style={{ height: 500 }}
      />
      {result.length > 0 && (
        <textarea
          type="text"
          value={result.map((item) => item.result).join("\n")}
          style={{ height: 500 }}
        />
      )}
      <textarea
        type="text"
        placeholder="데이터를 복사 붙혀넣기 하세요"
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
        style={{ height: 500 }}
      />
      <button onClick={handleTransform}>변환</button>
      <div>
        {result.map((item) => (
          <div>
            {item.name} : {item.result}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
