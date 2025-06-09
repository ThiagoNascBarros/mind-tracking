import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Questionarios from './pages/Questionarios';
import Questionario from './pages/Questionario';
import Dashboard from './pages/Dashboard';
import Faq from './pages/Faq'
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';

function App() {
  return (
    <div className="bg-[linear-gradient(135deg,#03061B_0%,#0F1526_50%,#0F1A3D_100%)] min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionarios" element={<Questionarios />} />
        <Route path="/questionario" element={<Questionario mostrarSaudacao={true} />} />
        <Route path="/questionario-continuacao" element={<Questionario mostrarSaudacao={false} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Cadastrar />} />
      </Routes>
    </div>
  )
}

export default App
