import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
 import { HashRouter , Route, BrowserRouter, Routes } from "react-router-dom";
 import 'bootstrap-icons/font/bootstrap-icons.css';
import LandingPage from "pages/LandingPage";
import Home from "pages/Home";
import './tailwind.css'

function App() {
  return (
    <div className="App">
        <HashRouter >
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
         <Route exact path="/home" element={<Home/>} /> 
        </Routes>

      </HashRouter>
    </div>
  );
}

export default App;
