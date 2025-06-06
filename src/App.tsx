import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Questionarios from './pages/Questionarios';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="bg-gradient-to-bl from-[#03061B] via-[#0F1526] to-[#0F1A3D] min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionarios" element={<Questionarios />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
