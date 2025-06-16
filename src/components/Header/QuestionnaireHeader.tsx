import Logo from "/images/Logo.svg";

export default function QuestionnaireHeader() {
  return (
    <header
      className="h-[86px] px-4 sm:px-8 md:px-12 lg:px-[120px] flex items-center justify-between border-[#bebebe] relative"
      style={{ background: "#070B1F" }}
    >
      <div>
        <img
          src={Logo}
          alt="logo"
          className="w-[160px] md:w-[180px] lg:w-[212px] h-[46px]"
        />
      </div>
    </header>
  );
} 