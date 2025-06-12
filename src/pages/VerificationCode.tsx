import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '/images/Logo.svg'; // Adjust path if necessary based on your public folder structure

const VerificationCode: React.FC = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.email || '';

  useEffect(() => {
    if (!userEmail) {
      // If no email is present, redirect back to signup or login
      navigate('/sign-up', { replace: true });
    }
  }, [userEmail, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (error) setError(null);
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    // Auto-focus to next input
    if (e.target.value && index < 3) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fullCode = code.join('');

    if (fullCode.length !== 4) {
      setError("Por favor, insira o código de verificação completo");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          codigo: fullCode
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem('__redirectCheck', 'true');
        navigate("/questionario"); // Redirect to the initial questionnaire or dashboard
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

  const handleResendCode = async () => {
    setError(null);
    setResendMessage(null);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/resend-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setResendMessage("Novo código enviado com sucesso!");
      } else {
        setError(data.message || "Erro ao reenviar código");
      }
    } catch (err) {
      setError("Erro ao se conectar ao servidor");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070B1F] p-4">
      <div className="bg-[#161D2D] rounded-[12px] p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-[60px] h-[60px] mb-6" />
        <h1 className="text-white text-2xl sm:text-3xl font-semibold mb-2">Código de verificação</h1>
        <p className="text-[#8592AD] text-sm sm:text-base text-center mb-4">
          Um código de 4 dígitos foi enviado para <span className="font-bold text-blue-400">{userEmail}</span>. Digite-o abaixo.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <div className="flex gap-3 sm:gap-4 mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1E2A48] text-white text-center text-xl sm:text-2xl rounded-lg border border-[#3399FF] focus:outline-none focus:border-[#2980e9] focus:ring-1 focus:ring-[#2980e9]"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          {resendMessage && <p className="text-green-500 text-sm text-center mb-4">{resendMessage}</p>}
          <button
            type="submit"
            className="w-full bg-[#3399FF] hover:bg-[#2980e9] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base text-white font-medium"
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Enviar código'}
          </button>
          <button
            type="button"
            onClick={handleResendCode}
            className="w-full mt-2 bg-transparent text-gray-400 hover:text-white transition-colors duration-200 rounded-full py-2.5 text-sm font-medium"
            disabled={loading}
          >
            Reenviar Código
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode; 