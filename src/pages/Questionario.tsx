import { useParams } from "react-router-dom";
import Questionario from "../components/Questionarios/PageQuestionario";
import QuestionarioDiario from "../components/Questionarios/PageQuestionarioDiario";

interface QuestionarioPageProps {
  mostrarSaudacao?: boolean;
  tipo?: string;
}

export default function QuestionarioPage({ mostrarSaudacao = false, tipo }: QuestionarioPageProps) {
  if (tipo === "diario") {
    return <QuestionarioDiario />;
  }

  return (
    <>
      <Questionario mostrarSaudacao={mostrarSaudacao} />
    </>
  );
}
