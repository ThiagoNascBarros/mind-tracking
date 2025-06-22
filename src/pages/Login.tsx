import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeClosed } from 'lucide-react';

const logoImg = '/images/logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.id]: '' }));
  };

  const validateLogin = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) newErrors.email = 'Obrigatório';
    if (!formData.senha.trim()) newErrors.senha = 'Obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://34.200.62.154:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        
        if (data.redirect) {
          navigate(data.redirect);
        } else if (data.user.questionario_inicial) {
          navigate('/dashboard');
        } else {
          navigate('/questionario');
        }
      } else if (data.needsVerification) {
        sessionStorage.setItem('email', data.email);
        navigate('/verificacao');
      } else {
        setErrors({ submit: data.message || 'Erro ao fazer login' });
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setErrors({ submit: 'Erro ao conectar-se ao servidor. Verifique sua conexão.' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full h-[36px] px-3 rounded-full bg-white text-black border text-sm focus:outline-none ${
      errors[field] ? 'border-red-500' : 'border-[#39f]'
    }`;

  return (
    <div className="w-full h-screen flex items-center justify-center px-4 md:py-8 bg-[linear-gradient(to_bottom,_#0F1A3D_0%,_#0F1526_50%,_#03061B_100%)] overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-[1000px] h-full overfloidden gap-[2em]">
        <div className="hidden md:flex w-[60%] h-full rounded-4xl py-4 pr-24 items-center justify-center overflow-hidden bg-[url('/images/ImgSignUp.png')] bg-cover">
          <div className='text-white flex flex-col pl-8 pb-10 mt-auto'>
            <h3 className='font-semibold text-[1.150em] text-left'>Continue sua jornada de autocuidado e acompanhe seu progresso na MindTracking.</h3>
            <p className='font-semibold text-[0.9em]'>
               ✓ Acompanhe seu progresso<br/>
               ✓ Relatórios personalizados<br/>
               ✓ Suporte da Mind IA<br/>
            </p>
          </div>
        </div>
        <div className="w-full md:max-w-[400px] md:w-full h-full flex items-center justify-center p-4 md:p-8 text-white">
          <div className="w-full max-w-md space-y-4">
            <div className="flex flex-col items-center w-full ">
              <img src={logoImg} alt="Logo" className="h-12 w-12 mb-2" />
              <h2 className="mb-4 text-base text-center font-medium ">
                 Entre no MindTracking
              </h2>


              <div className="flex bg-[#142129] p-2 rounded-full mb-6 w-full max-w-[300px]">
                <button
                  className="w-1/2 py-2 rounded-full text-sm font-medium text-white bg-[#3399FF] cursor-pointer"
                >
                  Entrar
                </button>
                <button
                  className="w-1/2 py-2 rounded-full text-sm font-medium text-white cursor-pointer"
                  onClick={() => navigate('/sign-up')}
                >
                  Cadastrar
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key="form-login" // chave para o AnimatePresence identificar
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="w-full space-y-1 pb-15"
                  noValidate
                >
                  <div className="space-y-2">
                    <label
                      className="flex justify-between text-sm font-medium"
                      htmlFor="email"
                    >
                      Email
                      {errors.email && (
                        <span className="text-red-500 text-xs">{errors.email}</span>
                      )}
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`${inputClass('email')} placeholder:text-sm placeholder:text-gray-400 placeholder:font-light`}
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Digite seu email"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <label
                      className="flex justify-between text-sm font-medium"
                      htmlFor="senha"
                    >
                      Senha
                      {errors.senha && (
                        <span className="text-red-500 text-xs">{errors.senha}</span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        id="senha"
                        type={showPassword ? "text" : "password"}
                        className={`${inputClass('senha')} placeholder:text-sm placeholder:text-gray-400 placeholder:font-light pr-10`}
                        value={formData.senha}
                        onChange={handleInputChange}
                        placeholder="Digite sua senha"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                           <EyeClosed />
                          ) : (
                            <Eye />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="text-white text-sm hover:text-gray-300 transition font-roboto font-bold cursor-pointer"
                      onClick={() => navigate('/redefine')}
                    >
                      Esqueceu sua senha?
                    </button>
                  </div>

                  <div className="flex justify-end mt-4">
                    {errors.submit && (
                      <div className="text-red-500 text-sm mb-2 w-full text-center">
                        {errors.submit}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-1/2 max-w-[300px] h-[36px] bg-[#3399FF] cursor-pointer text-white text-sm rounded-full hover:bg-[#2688e3] transition font-roboto font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Entrando...' : 'Entrar'}
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
