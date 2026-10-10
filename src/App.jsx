import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from "./components/sidebar.jsx";
import Home from "./components/home.jsx";
import Doctor from "./components/doctor.jsx";
import Clinic from './components/clinic.jsx';
import Market from "./components/market.jsx";
import Login from "./components/login.jsx";
import Pharmacy from './components/pharmacy.jsx';
import Dependent from './components/dependent.jsx';
function App() {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<><Sidebar isClosed={isClosed} /><Home isClosed={isClosed} setIsClosed={setIsClosed} /></> }/>
        <Route path="/doctor" element={<><Sidebar isClosed={isClosed} /><Doctor isClosed={isClosed} setIsClosed={setIsClosed} /></>} />
        <Route path="/clinic" element={<><Sidebar isClosed={isClosed} /><Clinic  isClosed={isClosed} setIsClosed={setIsClosed}/></>} />
        <Route path="/market" element={<><Sidebar isClosed={isClosed} /><Market isClosed={isClosed} setIsClosed={setIsClosed} /></>} />
        <Route path="/pharmacy" element={<><Sidebar isClosed={isClosed} /><Pharmacy isClosed={isClosed} setIsClosed={setIsClosed} /></>} />
       <Route path="/dependent" element={<><Sidebar isClosed={isClosed} /><Dependent isClosed={isClosed} setIsClosed={setIsClosed} /></>} />
      </Routes>
    </BrowserRouter>
  );
} 


export default App;


