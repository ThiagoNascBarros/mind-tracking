import Questionario from "../components/PageQuestionario";

interface QuestionarioPageProps {
  mostrarSaudacao?: boolean;
}

export default function QuestionarioPage({ mostrarSaudacao = false }: QuestionarioPageProps) {
  return (
    <>
      <Questionario mostrarSaudacao={mostrarSaudacao} />
    </>
  );
}
