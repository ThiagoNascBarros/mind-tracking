import Logo from "/images/Logo.svg";

export default function QuestionnaireFooter() {
  return (
    <footer className="bg-gradient-to-bl from-[#03061B] via-[#0F1526] to-[#0F1A3D] text-white py-8 sm:py-8 px-2 sm:px-4 md:px-8 md:py-12 lg:px-[75px] min-h-[324px] flex flex-col justify-center">
      <div className="container mx-auto pl-2 md:pl-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between sm:gap-10 h-[500px] sm:h-auto">
          <div className="flex flex-col items-start lg:items-start gap-2 sm:gap-4 lg:gap-8 w-full lg:w-1/3 text-left">
            <img
              className="h-12 sm:h-16 lg:h-19"
              src={Logo}
              alt="Mind Tracking Logo"
            />
            <p className="text-sm sm:text-sm lg:text-base text-[#E5E7EB] leading-relaxed w-[300px] sm:w-auto">
              Seu companheiro digital para autoconhecimento, bem-estar mental e
              crescimento pessoal.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 