import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeClosed } from "lucide-react"
import Logo from '../../public/images/logo.png';

export default function AlterarSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [erros, setErros] = useState<{ novaSenha?: string; confirmarSenha?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validarSenha = (senha: string) => {
    if (senha.length < 6) return 'A senha deve ter no mínimo 6 caracteres.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const novosErros: { novaSenha?: string; confirmarSenha?: string } = {};

    const erroNovaSenha = validarSenha(novaSenha);
    if (erroNovaSenha) novosErros.novaSenha = erroNovaSenha;

    if (confirmarSenha !== novaSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem!';
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      setLoading(true);
      try {
        const email = localStorage.getItem('recuperaEmail');
        const response = await fetch('https://mindtrack-api.onrender.com/auth/redefinir-senha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha: novaSenha, confirmarSenha })
        });

        const data = await response.json();

        if (data.success) {
          localStorage.removeItem('recuperaEmail');
          navigate('/sign-in');
        } else {
          setErros({ novaSenha: data.message || 'Erro ao redefinir senha' });
        }
      } catch (err) {
        setErros({ novaSenha: 'Erro ao conectar-se ao servidor' });
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 md:py-8 overflow-hidden">
      <div className="bg-[#203655] p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={ Logo }
            alt="Logo"
            className="h-16 w-16 mb-4"
          />
          <h1 className="text-white text-2xl font-semibold mb-1">Alterar sua senha</h1>
          <p className="text-[rgba(255,255,255,0.45)] text-base text-center font-semibold">
            Digite uma nova senha e a confirme
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative h-12">
              <input
                type={mostrarNovaSenha ? 'text' : 'password'}
                name="senha"
                placeholder="Nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className={`w-full px-4 py-3 pr-10 rounded-md bg-[#203655] text-white placeholder-gray-400 border ${
                  erros.novaSenha
                    ? 'border-red-500 focus:ring-0'
                    : 'border-[rgba(255,255,255,0.45)] focus:ring-2 focus:ring-blue-500'
                } focus:outline-none h-full`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
              >
                {mostrarNovaSenha ? <EyeClosed /> : <Eye />}
              </button>
            </div>
            {erros.novaSenha && (
              <p className="text-red-500 text-sm mt-1">{erros.novaSenha}</p>
            )}
          </div>

          <div>
            <div className="relative h-12">
              <input
                type={mostrarConfirmarSenha ? 'text' : 'password'}
                name="confirmarSenha"
                placeholder="Confirmar nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className={`w-full px-4 py-3 pr-10 rounded-md bg-[#203655] text-white placeholder-gray-400 border ${
                  erros.confirmarSenha
                    ? 'border-red-500 focus:ring-0'
                    : 'border-[rgba(255,255,255,0.45)] focus:ring-2 focus:ring-blue-500'
                } focus:outline-none h-full`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              >
                {mostrarConfirmarSenha ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            {erros.confirmarSenha && (
              <p className="text-red-500 text-sm mt-1">{erros.confirmarSenha}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Alterando senha...' : 'Alterar senha'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/sign-in')}
            className="text-sm text-blue-400 hover cursor-pointer"
          >
            ← Voltar para o login
          </button>
        </div>
      </div>
    </div>
  );
}
