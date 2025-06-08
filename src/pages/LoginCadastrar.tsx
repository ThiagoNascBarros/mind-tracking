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

  const validateCadastro = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nome.trim()) newErrors.nome = 'Campo obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Campo obrigatório';
    if (!formData.senha.trim()) newErrors.senha = 'Campo obrigatório';
    else if (formData.senha.length < 6) newErrors.senha = 'Mínimo 6 caracteres';
    if (!formData.confirmarSenha.trim()) newErrors.confirmarSenha = 'Campo obrigatório';
    else if (formData.confirmarSenha !== formData.senha)
      newErrors.confirmarSenha = 'Senhas não coincidem';
    if (!formData.dataNascimento.trim()) newErrors.dataNascimento = 'Campo obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) newErrors.email = 'Campo obrigatório';
    if (!formData.senha.trim()) newErrors.senha = 'Campo obrigatório';
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
    <div className="w-full min-h-screen flex items-center justify-center px-6 py-6 bg-gradient-to-r from-[#03061B] via-[#0F1526] to-[#0F1A3D] overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-[1000px] h-[calc(100vh-48px)] md:h-[600px]">
        <div className="md:w-[60%] w-full rounded-2xl overflow-hidden -ml-8 md:-ml-12 flex justify-start items-center py-2">
          <img
            src={activeTab === 'login' ? marImgLogin : marImgCadastrar}
            alt="Imagem fundo oceano"
            className="w-full h-auto object-contain max-h-[96%]"
          />
        </div>

        <div className="md:w-[40%] w-full p-6 md:p-8 flex flex-col justify-center text-white">
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
                className="w-full space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                {activeTab === 'cadastrar' && (
                  <>
                    <div>
                      <label className="block text-sm mb-1 font-medium" htmlFor="nome">
                        Nome completo
                      </label>
                      <input
                        id="nome"
                        type="text"
                        placeholder="Digite seu nome completo"
                        className={`w-full h-[40px] px-4 rounded-full bg-white text-black border placeholder-[#565656] text-sm focus:outline-none ${
                          errors.nome ? 'border-red-500' : 'border-[#39f]'
                        }`}
                        value={formData.nome}
                        onChange={handleInputChange}
                      />
                      {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm mb-1 font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    className={`w-full h-[40px] px-4 rounded-full bg-white text-black border placeholder-[#565656] text-sm focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-[#39f]'
                    }`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium" htmlFor="senha">
                    Senha
                  </label>
                  {errors.senha && <p className="text-red-500 text-xs mb-1">{errors.senha}</p>}
                  <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    className={`w-full h-[40px] px-4 rounded-full bg-white text-black border placeholder-[#565656] text-sm focus:outline-none ${
                      errors.senha ? 'border-red-500' : 'border-[#39f]'
                    }`}
                    value={formData.senha}
                    onChange={handleInputChange}
                  />
                </div>

                {activeTab === 'cadastrar' && (
                  <>
                    <div>
                      <label className="block text-sm mb-1 font-medium" htmlFor="confirmarSenha">
                        Confirme sua senha
                      </label>
                      {errors.confirmarSenha && (
                        <p className="text-red-500 text-xs mb-1">{errors.confirmarSenha}</p>
                      )}
                      <input
                        id="confirmarSenha"
                        type="password"
                        placeholder="Confirme sua senha"
                        className={`w-full h-[40px] px-4 rounded-full bg-white text-black border placeholder-[#565656] text-sm focus:outline-none ${
                          errors.confirmarSenha ? 'border-red-500' : 'border-[#39f]'
                        }`}
                        value={formData.confirmarSenha}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1 font-medium" htmlFor="dataNascimento">
                        Data de nascimento
                      </label>
                      <input
                        id="dataNascimento"
                        type="date"
                        className={`w-full h-[40px] px-4 rounded-full bg-white text-black border placeholder-[#565656] text-sm focus:outline-none ${
                          errors.dataNascimento ? 'border-red-500' : 'border-[#39f]'
                        }`}
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                      />
                      {errors.dataNascimento && (
                        <p className="text-red-500 text-xs mt-1">{errors.dataNascimento}</p>
                      )}
                    </div>
                  </>
                )}

                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="w-[140px] h-[40px] bg-[#3399FF] text-white text-sm font-bold rounded-full hover:bg-[#2688e3] transition"
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
  );
}
