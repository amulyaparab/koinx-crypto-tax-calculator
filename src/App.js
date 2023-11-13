import "./App.css";
import Calculator from "./components/Calculator";
import FAQs from "./components/FAQs";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="parent">
        <Calculator />
        <FAQs />
      </div>
    </div>
  );
}

export default App;
