import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questionarios from './pages/Questionarios';
import Questionario from './pages/Questionario';
import Dashboard from './pages/Dashboard';
import Faq from './pages/Faq'
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';
import Mind from './pages/Mind-ia'
import NotFound from './pages/NotFound';
import CodigoVerificacao from './pages/Verificacao';
import RedefinirSenha from './pages/Redefine';
import AlterarSenha from './pages/AlterarSenha';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="bg-[linear-gradient(135deg,#03061B_0%,#0F1526_50%,#0F1A3D_100%)] min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionarios" element={
          <ProtectedRoute>
            <Questionarios />
          </ProtectedRoute>
        } />
        <Route path="/questionario" element={
          <ProtectedRoute>
            <Questionario mostrarSaudacao={true} />
          </ProtectedRoute>
        } />
        <Route path="/questionario/diario" element={
          <ProtectedRoute>
            <Questionario tipo="diario" />
          </ProtectedRoute>
        } />
        <Route path="/questionario-continuacao" element={
          <ProtectedRoute>
            <Questionario mostrarSaudacao={false} />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/faq" element={<Faq />} /> 
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Cadastrar />} />
        <Route path="/verificacao" element={<CodigoVerificacao />} />
        <Route path="/redefine" element={<RedefinirSenha />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
        <Route path="/mind-ai" element={
          <ProtectedRoute>
            <Mind />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
