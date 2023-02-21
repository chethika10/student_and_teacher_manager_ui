
import { BrowserRouter,
  Routes,
  Route } from 'react-router-dom';
import './App.css';
import "./css/Forms.css"
import { Register } from './screens/Register';
import { LogIN } from './screens/LogIN';
import { Home } from './screens/Home';
import { AboutUs } from './screens/AboutUs';
import { NavBar } from './components/NavBar';

function App() {
  
  return (
    <div >
    <header><NavBar/></header>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>} exact/>
      <Route path="/LogIN" element={<LogIN/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/aboutus" element={<AboutUs/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
