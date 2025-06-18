import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../public/images/logo.png';

export default function RedefinirSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('https://mindtrack-api.onrender.com/auth/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('recuperaEmail', email);
        navigate('/verificacao');
      } else {
        setError(data.message || 'Erro ao solicitar recuperação de senha');
      }
    } catch (err) {
      setError('Erro ao conectar-se ao servidor');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 md:py-8 overflow-hidden">
      <div className="bg-[#203655] p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-16 mb-4"
          />
          <h1 className="text-white text-2xl font-semibold mb-1">Redefinir sua senha</h1>
          <p className="text-[rgba(255,255,255,0.45)] text-base text-center  font-semibold">
             Digite seu e-mail para receber um link de recuperação
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-[#203655] text-white placeholder-gray-400 border border-[rgba(255,255,255,0.45)] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar código de verificação'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-400 hover cursor-pointer"
          >
            ← Voltar para o login
          </button>
        </div>
      </div>
    </div>
  );
}
