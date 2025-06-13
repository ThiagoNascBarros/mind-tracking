import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const logoImg = "/images/logo.png";

export default function Cadastrar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    dataNascimento: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }));
  };

  const validarEmailPublico = (email: string) => {
    const dominiosPublicos = [
      'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com',
      'icloud.com', 'aol.com', 'live.com', 'bol.com.br',
      'uol.com.br', 'zipmail.com.br', 'terra.com.br'
    ];

    const regexEmail = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
    const match = email.match(regexEmail);
    if (!match) return false;

    const dominio = match[1].toLowerCase();
    return dominiosPublicos.includes(dominio);
  };

  const validarSenha = (senha: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&#._-]).+$/;
    return regex.test(senha) && senha.length >= 6;
  };

  const validarDataNascimento = (dataNascimento: string) => {
    if (!dataNascimento) return false;
    const dataNasc = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();

    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    if (mesAtual < dataNasc.getMonth() || 
       (mesAtual === dataNasc.getMonth() && diaAtual < dataNasc.getDate())) {
      idade--;
    }
    return idade >= 12 && idade <= 90;
  };

  const validateRegister = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = "Obrigatório";
    } else if (!/^[A-Za-zÀ-ÿ ]+$/.test(formData.nomeCompleto)) {
      newErrors.nomeCompleto = "Apenas letras e espaços são permitidos";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Obrigatório";
    } else if (!validarEmailPublico(formData.email)) {
      newErrors.email = "Use um e-mail público válido (gmail, outlook, hotmail, etc)";
    }

    if (!formData.senha.trim()) {
      newErrors.senha = "Obrigatório";
    } else if (!validarSenha(formData.senha)) {
      newErrors.senha = "A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e mínimo de 6 caracteres";
    }

    if (!formData.confirmarSenha.trim()) {
      newErrors.confirmarSenha = "Obrigatório";
    } else if (formData.confirmarSenha !== formData.senha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }

    if (!formData.dataNascimento.trim()) {
      newErrors.dataNascimento = "Obrigatório";
    } else if (!validarDataNascimento(formData.dataNascimento)) {
      newErrors.dataNascimento = "Você deve ter entre 12 a 90 anos para se cadastrar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRegister()) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: formData.nomeCompleto,
            email: formData.email,
            senha: formData.senha,
            confirmarSenha: formData.confirmarSenha,
            data_nascimento: formData.dataNascimento
          })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          sessionStorage.setItem('email', formData.email);
          navigate("/verificacao");
        } else {
          setErrors({ submit: data.message || "Erro ao registrar usuário" });
        }
      } catch (error) {
        setErrors({ submit: "Erro ao se conectar ao servidor" });
        console.error("Erro:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const inputClass = (field: string) =>
    `w-full h-[36px] px-3 rounded-full bg-white text-black border text-sm focus:outline-none ${
      errors[field] ? "border-red-500" : "border-[#39f]"
    }`;

  return (
    <div className="w-full h-screen flex items-center justify-center px-4 md:py-8 bg-[linear-gradient(to_bottom,_#0F1A3D_0%,_#0F1526_50%,_#03061B_100%)] overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-[1000px] h-full overflow-hidden gap-[2em] justify-center items-center">
        <div className="hidden lg:flex lg:w-[60%] h-full rounded-4xl py-4 pr-24 items-center justify-center overflow-hidden bg-[url('/images/ImgSignUp.png')] bg-cover">
          <div className="text-white flex flex-col pl-8 pb-10 mt-auto">
            <h1 className="font-semibold text-[2em]">Junte-se a nós</h1>
            <h3 className="font-semibold text-[1em] text-left">
              Comece hoje sua jornada para uma mente mais saudável com nossas
              ferramentas especializadas.
            </h3>
            <p className="font-semibold text-[0.9em]">
              ✓ Questionários personalizados
              <br />
              ✓ Acompanhamento contínuo
              <br />✓ Privacidade garantida
            </p>
          </div>
        </div>

        <div className="w-full md:max-w-[400px] md:w-full h-full flex items-center justify-center p-4 md:p-8 text-white">
          <div className="w-full max-w-md space-y-4">
            <div className="flex flex-col items-center w-full">
              <img src={logoImg} alt="Logo" className="h-12 w-12 mb-1" />
              <h2 className="mb-2 text-lg text-center font-medium">
                Seja Bem-Vindo(a) ao MindTracking
              </h2>

              <div className="flex bg-[#142129] p-1 rounded-full mb-3 w-full max-w-[300px]">
                <button
                  className="w-1/2 py-2 rounded-full text-sm font-medium text-white cursor-pointer"
                  onClick={() => navigate("/sign-in")}
                >
                  Entrar
                </button>
                <button className="w-1/2 py-2 rounded-full text-sm font-medium text-white bg-[#3399FF] cursor-pointer">
                  Cadastrar
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.form
                key="form-cadastrar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="w-full space-y-3"
                noValidate
              >
                <div className="space-y-1 mb-2">
                  <label
                    className="flex justify-between text-sm font-medium"
                    htmlFor="nomeCompleto"
                  >
                    Nome completo
                    {errors.nomeCompleto && (
                      <span className="text-red-500 text-xs">
                        {errors.nomeCompleto}
                      </span>
                    )}
                  </label>
                  <input
                    id="nomeCompleto"
                    type="text"
                    className={`${inputClass(
                      "nomeCompleto"
                    )} placeholder:text-sm placeholder:text-gray-400 placeholder:font-light`}
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div className="space-y-1 mb-2">
                  <label
                    className="flex justify-between text-sm font-medium"
                    htmlFor="email"
                  >
                    Email
                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email}
                      </span>
                    )}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`${inputClass(
                      "email"
                    )} placeholder:text-sm placeholder:text-gray-400 placeholder:font-light`}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Digite seu email"
                  />
                </div>

                <div className="space-y-1 mb-2">
                  <label
                    className="flex justify-between text-sm font-medium"
                    htmlFor="senha"
                  >
                    Senha
                    {errors.senha && (
                      <span className="text-red-500 text-xs">
                        {errors.senha}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      id="senha"
                      type={showPassword ? "text" : "password"}
                      className={`${inputClass(
                        "senha"
                      )} placeholder:text-sm placeholder:text-gray-400 placeholder:font-light pr-10`}
                      value={formData.senha}
                      onChange={handleInputChange}
                      placeholder="Digite sua senha"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 mb-2">
                  <label
                    className="flex justify-between text-sm font-medium"
                    htmlFor="confirmarSenha"
                  >
                    Confirmar Senha
                    {errors.confirmarSenha && (
                      <span className="text-red-500 text-xs">
                        {errors.confirmarSenha}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      id="confirmarSenha"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`${inputClass(
                        "confirmarSenha"
                      )} placeholder:text-sm placeholder:text-gray-400 placeholder:font-light pr-10`}
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                      placeholder="Confirme sua senha"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 mb-2">
                  <label
                    className="flex justify-between text-sm font-medium"
                    htmlFor="dataNascimento"
                  >
                    Data de Nascimento
                    {errors.dataNascimento && (
                      <span className="text-red-500 text-xs">
                        {errors.dataNascimento}
                      </span>
                    )}
                  </label>
                  <input
                    id="dataNascimento"
                    type="date"
                    className={`${inputClass(
                      "dataNascimento"
                    )} placeholder:text-sm placeholder:text-gray-400 placeholder:font-light`}
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                  />
                </div>

                {errors.submit && (
                  <div className="text-red-500 text-sm text-center">
                    {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-[36px] bg-[#3399FF] text-white rounded-full text-sm font-medium transition-colors ${
                    isLoading 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:bg-[#2980ff]"
                  }`}
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
                </button>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
