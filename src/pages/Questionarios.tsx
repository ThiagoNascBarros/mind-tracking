import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/CardQuestionario/Card";
import IconQuestionario from "/Assets/IconQuestionarioDiario.svg";
import IconProgresso from "/Assets/IconProgressoSemanal.svg";
import Footer from "../components/Footer/Footer";

export default function Questionarios() {

    return (
        <div>
            <Header />
            <div className="md:mx-32">
                <div
                    className="w-[20em] m-auto h-full pt-[1.5em] md:pt-[4rem] gap-[12px] md:w-full"
                >
                    <h3 className="text-[1.5em] md:text-[3em] font-bold text-center text-white ">Seus Questionários Diários</h3>
                    <p className="text-[0.850em] md:text-[1em] text-[#888D9C] text-center font-semibold">Responda nossos questionários personalizados e acompanhe seu progresso na jornada de bem-estar mental.</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-stretch gap-y-5 md:gap-x-5 mt-10 justify-center">
                    <div className="w-full">
                        <Card 
                            titulo="Questionário Diario"
                            imagemUrl={IconQuestionario}
                            altTextoImagem="Icon"
                            descricao="Conte para nós como foram as partes mais importantes do seu dia. Sua reflexão diária é um passo valioso para o autoconhecimento, o equilíbrio emocional e a construção de uma vida mais consciente e significativa."
                            textButton="Iniciar Questionário"
                            bgButton="bg-[#3399FF]"
                            navigationLink="/questionario"
                        />  
                    </div>
                    <div className="w-full">
                        <Card 
                           titulo="Seu Progresso Semanal"
                           imagemUrl={IconProgresso}
                           altTextoImagem="Icon"
                           descricao="Conte para nós como foram as partes mais importantes do seu dia. Sua reflexão diária é um passo valioso para o autoconhecimento, o equilíbrio emocional e a construção de uma vida mais consciente e significativa."
                           textButton="Ver progresso"
                           bgButton="bg-[#0C121D]"
                           strokeButton="border-2 border-[#3399FF]"
                           navigationLink="/dashboard"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-[10em]">
                <Footer />
            </div>
        </div>
    )

}