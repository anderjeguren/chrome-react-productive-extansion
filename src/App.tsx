import "./App.css";
import Pomodoro from "./components/Pomodoro";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Pomodoro />
      </header>
    </div>
  );
}

export default App;
