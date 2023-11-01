import "./App.css";
import DataParentComponent from "./DataFilterContainer";

function App() {
  return (
    <div className="App">
      <h1>Search within experiments and generate plots</h1>
      <DataParentComponent></DataParentComponent>
    </div>
  );
}

export default App;
