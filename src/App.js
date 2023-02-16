
import { BrowserRouter,
  Routes,
  Route } from 'react-router-dom';
import './App.css';
import "./css/Forms.css"
import { Register } from './screens/Register';
import { LogIN } from './screens/LogIN';
import { Home } from './screens/Home';

function App() {
  return (
    <div >
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<LogIN/>}/>
      <Route path="/LogIN" element={<LogIN/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Home" element={<Home/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
