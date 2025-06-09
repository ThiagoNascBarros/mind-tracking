import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const marImgCadastro = '/images/mar3.png';
const logoImg = '/images/logo.png';

export default function Cadastrar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
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

  const calculaIdade = (data: string) => {
    const hoje = new Date();
    const nasc = new Date(data);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }
    return idade;
  };

  const validateRegister = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Obrigatório';
    } else if (formData.nomeCompleto.trim().length < 6) {
      newErrors.nomeCompleto = 'Mínimo 6 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Obrigatório';
    }

    if (!formData.senha.trim()) {
      newErrors.senha = 'Obrigatório';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Mínimo 6 caracteres';
    }

    if (!formData.confirmarSenha.trim()) {
      newErrors.confirmarSenha = 'Obrigatório';
    } else if (formData.confirmarSenha !== formData.senha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    if (!formData.dataNascimento.trim()) {
      newErrors.dataNascimento = 'Obrigatório';
    } else {
      const idade = calculaIdade(formData.dataNascimento);
      if (idade < 12) newErrors.dataNascimento = 'Mínimo 12 anos';
      else if (idade > 100) newErrors.dataNascimento = 'Máximo 100 anos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRegister()) {
      console.log('Dados válidos:', formData);
      navigate('/Login');
    }
  };

  const inputClass = (field: string) =>
    `w-full h-[36px] px-3 rounded-full bg-white text-black border text-sm focus:outline-none ${
      errors[field] ? 'border-red-500' : 'border-[#39f]'
    }`;

  return (
    <div className="w-full h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#03061B] via-[#0F1526] to-[#0F1A3D] overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-[1000px] h-full overflow-hidden">
        <div className="hidden md:flex md:w-[60%] h-full py-4 items-center justify-center overflow-hidden">
          <img
            src={marImgCadastro}
            alt="Imagem fundo oceano"
            className="w-[80%] h-full object-contain rounded-2xl"
          />
        </div>

        <div className="w-full md:w-[40%] h-full flex items-center justify-center p-4 md:p-8 text-white">
          <div className="w-full max-w-md space-y-4">
            <div className="flex flex-col items-center w-full">
              <img src={logoImg} alt="Logo" className="h-12 w-12 mb-2" />
              <h2 className="mb-4 text-lg text-center font-semibold">
                Crie sua conta no MindTracking
              </h2>

              {/* Botões de alternância */}
              <div className="flex bg-[#0F1A3D] p-1 rounded-full mb-6 w-full max-w-[300px]">
                <button
                  className="w-1/2 py-2 rounded-full text-sm font-medium text-white"
                  onClick={() => navigate('/Login')}
                >
                  Entrar
                </button>
                <button
                  className="w-1/2 py-2 rounded-full text-sm font-medium text-white bg-[#3399FF]"
                >
                  Cadastrar
                </button>
              </div>

              {/* Formulário com animação */}
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
                  <div>
                    <label
                      className="flex justify-between text-sm font-medium"
                      htmlFor="nomeCompleto"
                    >
                      Nome completo
                      {errors.nomeCompleto && (
                        <span className="text-red-500 text-xs">{errors.nomeCompleto}</span>
                      )}
                    </label>
                    <input
                      id="nomeCompleto"
                      type="text"
                      className={inputClass('nomeCompleto')}
                      value={formData.nomeCompleto}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-sm font-medium" htmlFor="email">
                      Email
                      {errors.email && (
                        <span className="text-red-500 text-xs">{errors.email}</span>
                      )}
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={inputClass('email')}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-sm font-medium" htmlFor="senha">
                      Senha
                      {errors.senha && (
                        <span className="text-red-500 text-xs">{errors.senha}</span>
                      )}
                    </label>
                    <input
                      id="senha"
                      type="password"
                      className={inputClass('senha')}
                      value={formData.senha}
                      onChange={handleInputChange}
                    />
                  </div>

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
                      className={inputClass('confirmarSenha')}
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
                      className={inputClass('dataNascimento')}
                      value={formData.dataNascimento}
                      onChange={handleInputChange}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="w-1/2 max-w-[300px] h-[36px] bg-[#3399FF] text-white text-sm font-bold rounded-full hover:bg-[#2688e3] transition"
                    >
                      Cadastrar
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
