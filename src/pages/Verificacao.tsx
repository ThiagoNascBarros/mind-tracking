import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../public/images/logo.png';

// Remove number input spinners for all browsers
const inputSpinnerStyle = `
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export default function CodigoVerificacao() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationType, setVerificationType] = useState<'recovery' | 'registration'>('recovery');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have an email in sessionStorage (registration) or localStorage (recovery)
    const registrationEmail = sessionStorage.getItem('email');
    const recoveryEmail = localStorage.getItem('recuperaEmail');
    
    if (registrationEmail) {
      setVerificationType('registration');
    } else if (recoveryEmail) {
      setVerificationType('recovery');
    } else {
      // If no email is found, redirect to login
      navigate('/sign-in');
    }
  }, [navigate]);

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
      const email = verificationType === 'registration' 
        ? sessionStorage.getItem('email')
        : localStorage.getItem('recuperaEmail');

      if (!email) {
        setError("Email não encontrado. Por favor, tente novamente.");
        setLoading(false);
        return;
      }

      // Escolhe o endpoint correto baseado no tipo de verificação
      const endpoint = verificationType === 'recovery' 
        ? 'http://34.200.62.154:3000/auth/verificar-codigo'
        : 'http://34.200.62.154:3000/auth/verify-email';

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          codigo: code
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro na verificação do código');
      }

      const data = await response.json();

      if (data.success) {
        if (verificationType === 'recovery') {
          navigate("/alterar-senha");
        } else {
          // For registration, store the token and user data, then redirect to questionnaire
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
          sessionStorage.removeItem('email');
          navigate("/questionario");
        }
      } else {
        setError(data.message || "Código de verificação inválido");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao se conectar ao servidor");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 md:py-8 overflow-hidden">
      <style>{inputSpinnerStyle}</style>
      <div className="bg-[#203655] p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-16 mb-4"
          />
          <h1 className="text-white text-2xl font-semibold mb-1">Código de verificação</h1>
          <p className="text-[rgba(255,255,255,0.45)] text-base text-center  font-semibold">
            {verificationType === 'recovery' 
              ? 'Digite o código que enviamos no seu email para recuperar sua senha'
              : 'Digite o código que enviamos no seu email para confirmar seu cadastro'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-2">
            {[0, 1, 2, 3].map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-18 h-18 text-center text-2xl rounded-2xl bg-[#D9D9D9] text-black border border-[rgba(400,400,400,0.45)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // só permite dígitos
                  if (value.length > 1) return; // impede mais de um caractere
                  e.target.value = value;
                  handleChange(index, value);
                }}
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
