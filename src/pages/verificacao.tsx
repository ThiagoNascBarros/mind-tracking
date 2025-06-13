import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CodigoVerificacao() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    } else if (value === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    const code = inputsRef.current.map((input) => input?.value).join('');
    
    if (code.length !== 4) {
      setError("Por favor, insira o código de verificação completo");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/verificar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem('recuperaEmail'),
          codigo: code
        })
      });

      if (!response.ok) {
        throw new Error('Erro na verificação do código');
      }

      const data = await response.json();

      if (data.success) {
        navigate("/alterar-senha");
      } else {
        setError(data.message || "Código de verificação inválido");
      }
    } catch (err) {
      setError("Erro ao se conectar ao servidor");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 md:py-8 overflow-hidden">
      <div className="bg-[#203655] p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src="public/images/Logo.png"
            alt="Logo"
            className="h-16 w-16 mb-4"
          />
          <h1 className="text-white text-2xl font-semibold mb-1">Código de verificação</h1>
          <p className="text-[rgba(255,255,255,0.45)] text-base text-center font-['Roboto'] font-semibold">
            Digite o código que enviamos no seu email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-2">
            {[0, 1, 2, 3].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-18 h-18 text-center text-2xl rounded-2xl bg-[#D9D9D9] text-black border border-[rgba(400,400,400,0.45)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition cursor-pointer mt-3 border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verificando...' : 'Enviar código'}
          </button>
        </form>
      </div>
    </div>
  );
}
