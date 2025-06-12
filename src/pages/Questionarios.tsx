import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Card from "../components/CardQuestionario/Card";
import IconQuestionario from "/Assets/IconQuestionarioDiario.svg";
import IconProgresso from "/Assets/IconProgressoSemanal.svg";
import Footer from "../components/Footer/Footer";

async function verificarQuestionarioDiario(userId: string, token: string): Promise<boolean> {
    try {
        const response = await fetch(`http://localhost:3000/questionario/verificar/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error('Erro ao verificar questionário');
        }

        const data = await response.json();
        return data.podeResponder;
    } catch (error) {
        console.error('Erro ao verificar questionário:', error);
        return false;
    }
}

export default function Questionarios() {
    const [podeResponder, setPodeResponder] = useState<boolean>(true);
    const [mensagem, setMensagem] = useState<string>("");

    useEffect(() => {
        const verificarQuestionario = async () => {
            const token = sessionStorage.getItem('token');
            const user = JSON.parse(sessionStorage.getItem('user') || "null");

            if (!token || !user) {
                setPodeResponder(false);
                setMensagem('Faça login para responder o questionário diário.');
                return;
            }

            const podeResponder = await verificarQuestionarioDiario(user.id, token);
            setPodeResponder(podeResponder);
            setMensagem(podeResponder ? "" : 'Você já respondeu o questionário diário hoje.');
        };

        verificarQuestionario();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-bl from-[#03061B] via-[#0F1526] to-[#0F1A3D]">
            <Header />
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="w-full max-w-[20em] sm:max-w-[24em] md:max-w-none mx-auto h-full pt-6 sm:pt-8 md:pt-12 lg:pt-16 gap-3 sm:gap-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white leading-tight">
                        Seus Questionários Diários
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-[#888D9C] text-center font-semibold mt-2 sm:mt-3 md:mt-4 leading-relaxed">
                        Responda nossos questionários personalizados e acompanhe seu progresso na jornada de bem-estar mental.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12">
                    <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(50%-1.5rem)] group">
                        <Card 
                            titulo="Questionário Diario"
                            imagemUrl={IconQuestionario}
                            altTextoImagem="Icon"
                            descricao="Conte para nós como foram as partes mais importantes do seu dia. Sua reflexão diária é um passo valioso para o autoconhecimento, o equilíbrio emocional e a construção de uma vida mais consciente e significativa."
                            textButton="Iniciar Questionário"
                            bgButton="bg-[#3399FF] hover:bg-[#2980e9] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                            navigationLink="/questionario"
                            disabled={!podeResponder}
                            mensagem={mensagem}
                        />  
                    </div>
                    <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(50%-1.5rem)] group">
                        <Card 
                           titulo="Seu Progresso Semanal"
                           imagemUrl={IconProgresso}
                           altTextoImagem="Icon"
                           descricao="Conte para nós como foram as partes mais importantes do seu dia. Sua reflexão diária é um passo valioso para o autoconhecimento, o equilíbrio emocional e a construção de uma vida mais consciente e significativa."
                           textButton="Ver progresso"
                           bgButton="bg-[#0C121D] hover:bg-[#1a2639] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                           strokeButton="border-2 border-[#3399FF] hover:border-[#2980e9]"
                           navigationLink="/dashboard"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-16 sm:mt-20 md:mt-24">
                <Footer />
            </div>
        </div>
    )
}