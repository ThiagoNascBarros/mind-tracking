import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const marImgLogin = '/images/mar.png';
const marImgCadastrar = '/images/mar3.png';
const logoImg = '/images/logo.png';

export default function LoginCadastrar() {
  const [activeTab, setActiveTab] = useState<'login' | 'cadastrar'>('login');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    dataNascimento: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.id]: '' }));
  };

  const calculateAge = (dateStr: string) => {
    const birthDate = new Date(dateStr);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  };

  const validateCadastro = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nome.trim()) newErrors.nome = 'Obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Obrigatório';
    if (!formData.senha.trim()) newErrors.senha = 'Obrigatório';
    else if (formData.senha.length < 6) newErrors.senha = 'Mínimo 6 caracteres';
    if (!formData.confirmarSenha.trim()) newErrors.confirmarSenha = 'Obrigatório';
    else if (formData.confirmarSenha !== formData.senha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
      newErrors.senha = 'Senhas não coincidem';
    }

   if (!formData.dataNascimento.trim()) {
  newErrors.dataNascimento = 'Obrigatório';
} else {
  const idade = calculateAge(formData.dataNascimento);
  if (idade < 12) {
    newErrors.dataNascimento = 'Idade mínima: 12 anos';
  } else if (idade > 105) {
    newErrors.dataNascimento = 'Idade máxima: 105 anos';
  }
}
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const validateLogin = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) newErrors.email = 'Obrigatório';
    if (!formData.senha.trim()) newErrors.senha = 'Obrigatório';
    else if (formData.senha.length < 6) newErrors.senha = 'Mínimo 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'cadastrar') {
      if (!validateCadastro()) return;
      alert('Cadastro realizado com sucesso!');
    } else {
      if (!validateLogin()) return;
      alert('Login realizado com sucesso!');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#03061B] via-[#0F1526] to-[#0F1A3D] overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-[1000px] h-full overflow-hidden">
        
        {/* Imagem: visível apenas em md+ */}
        <div className="hidden md:flex md:w-[60%] h-full py-4 items-center justify-center overflow-hidden">
          <img
            src={activeTab === 'login' ? marImgLogin : marImgCadastrar}
            alt="Imagem fundo oceano"
            className="w-[80%] h-full object-contain rounded-2xl"
          />
        </div>

        {/* Formulário */}
        <div className="w-full md:w-[40%] h-full flex items-center justify-center p-4 md:p-8 text-white">
          <div className="w-full max-w-md space-y-4">
            <div className="flex flex-col items-center w-full">
              <img src={logoImg} alt="Logo" className="h-12 w-12 mb-2" />
              <h2 className="mb-4 text-lg text-center font-semibold">
                {activeTab === 'login'
                  ? 'Seja Bem-Vindo(a) ao MindTracking'
                  : 'Crie sua conta no MindTracking'}
              </h2>

              <div className="flex bg-[#0F1A3D] p-1 rounded-full mb-6 w-full max-w-[300px]">
                <button
                  className={`w-1/2 py-2 rounded-full text-sm font-medium transition ${
                    activeTab === 'login' ? 'bg-[#3399FF] text-white' : 'text-white'
                  }`}
                  onClick={() => {
                    setActiveTab('login');
                    setErrors({});
                  }}
                >
                  Entrar
                </button>
                <button
                  className={`w-1/2 py-2 rounded-full text-sm font-medium transition ${
                    activeTab === 'cadastrar' ? 'bg-[#3399FF] text-white' : 'text-white'
                  }`}
                  onClick={() => {
                    setActiveTab('cadastrar');
                    setErrors({});
                  }}
                >
                  Cadastrar
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-3 max-h-full overflow-auto"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {activeTab === 'cadastrar' && (
                    <div>
                      <label className="flex justify-between text-sm font-medium" htmlFor="nome">
                        Nome completo
                        {errors.nome && <span className="text-red-500 text-xs">{errors.nome}</span>}
                      </label>
                      <input
                        id="nome"
                        type="text"
                        className={`w-full h-[36px] px-3 rounded-full bg-white text-black border text-sm focus:outline-none ${
                          errors.nome ? 'border-red-500' : 'border-[#39f]'
                        }`}
                        value={formData.nome}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  <div>
                    <label className="flex justify-between text-sm font-medium" htmlFor="email">
                      Email
                      {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full h-[36px] px-3 rounded-full bg-white text-black border text-sm focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-[#39f]'
                      }`}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-sm font-medium" htmlFor="senha">
                      Senha
                      {errors.senha && <span className="text-red-500 text-xs">{errors.senha}</span>}
                    </label>
                    <input
                      id="senha"
                      type="password"
                      className={`w-full h-[36px] px-3 rounded-full bg-white text-black border text-sm focus:outline-none ${
                        errors.senha ? 'border-red-500' : 'border-[#39f]'
                      }`}
                      value={formData.senha}
                      onChange={handleInputChange}
                    />
                  </div>

                  {activeTab === 'cadastrar' && (
                    <>
                      <div>
                        <label
                          className="flex justify-between text-sm font-medium"
                          htmlFor="confirmarSenha"
                        >
                          Confirme sua senha
                          {errors.confirmarSenha && (
                            <span className="text-red-500 text-xs">{errors.confirmarSenha}</span>
                          )}
                        </label>
                        <input
                          id="confirmarSenha"
                          type="password"
                          className={`w-full h-[36px] px-3 rounded-full bg-white text-black border text-sm focus:outline-none ${
                            errors.confirmarSenha ? 'border-red-500' : 'border-[#39f]'
                          }`}
                          value={formData.confirmarSenha}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label
                          className="flex justify-between text-sm font-medium"
                          htmlFor="dataNascimento"
                        >
                          Data de nascimento
                          {errors.dataNascimento && (
                            <span className="text-red-500 text-xs">{errors.dataNascimento}</span>
                          )}
                        </label>
                        <input
                          id="dataNascimento"
                          type="date"
                          className={`w-full h-[36px] px-3 rounded-full bg-white text-black border text-sm focus:outline-none ${
                            errors.dataNascimento ? 'border-red-500' : 'border-[#39f]'
                          }`}
                          value={formData.dataNascimento}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'login' && (
                    <div className="text-right text-white text-sm mt-2 mb-[-6px]">
                      <button type="button" className="hover:underline focus:outline-none">
                        <span className="no-underline">Esqueceu sua senha?</span>
                      </button>
                    </div>
                  )}

                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="w-1/2 max-w-[300px] h-[36px] bg-[#3399FF] text-white text-sm font-bold rounded-full hover:bg-[#2688e3] transition"
                    >
                      {activeTab === 'login' ? 'Entrar' : 'Cadastrar'}
                    </button>
                  </div>
                </motion.form>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
