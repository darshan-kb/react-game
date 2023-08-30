import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Game from './Components/Game';
import Redirect from './Components/Redirect';
import Navbar from './Components/Navbar';
import SocketTest from './Components/SocketTest';
import {Link} from 'react-router-dom';
import Wheel from './Components/Wheel';
import Board from './Components/Board';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/redirect" element={<Redirect/>}></Route>
        <Route path="/authorized" element={<Redirect/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/game" element={<Game/>}></Route>
        <Route path="/sock" element={<SocketTest/>}></Route>
        <Route path="/wheel" element={<Wheel rouletteData="[]" number ="3"/>}></Route>
        <Route path="/board" element={<Board/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
