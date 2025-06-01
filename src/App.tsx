import Header from './components/Header';

import { Routes, Route } from 'react-router-dom';
import Questionarios from './pages/Questionarios';

function App() {

  return (
    <div className="bg-gradient-to-bl from-[#03061B] via-[#0F1526] to-[#0F1A3D] min-h-screen">
      <Routes>
        <Route path="/questionarios" element={<Questionarios />} /> {/* Rota para a página de questionários */}
      </Routes>
    </div>
  )
}

export default App
