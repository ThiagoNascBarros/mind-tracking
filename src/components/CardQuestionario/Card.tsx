import { useNavigate } from "react-router-dom";

interface CardProps {
    titulo: string;
    imagemUrl: string;
    altTextoImagem: string;
    descricao: string;
    textButton: string;
    bgButton?: string;
    strokeButton?: string;
    navigationLink: string;
    disabled?: boolean;
    mensagem?: string;
}

export default function Card(props: CardProps) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (!props.disabled) {
            navigate(`${props.navigationLink}`)
        }
    }

    return (
        <div className="w-full max-w-[480px] xs:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto rounded-[12px] gap-2 xs:gap-4 sm:gap-6 md:gap-8 h-full border-3 border-[#3399FF] bg-[#161D2D] px-5 py-6 xs:p-4 sm:p-6 md:p-8 flex flex-col">
            <div className="flex gap-2 xs:gap-4 sm:gap-6 md:gap-8 items-center text-white">
                <img
                    className="size-8 xs:size-10 sm:size-12" 
                    src={props.imagemUrl} 
                    alt={props.altTextoImagem} 
                />
                <h3 className="font-semibold text-base xs:text-lg sm:text-xl md:text-2xl">{props.titulo}</h3>
            </div>
            <div className="flex-1">
                <p className="text-xs xs:text-sm sm:text-base md:text-lg text-[#8592AD]">{props.descricao}</p>
                {props.mensagem && (
                    <p className="text-xs xs:text-sm sm:text-base text-red-400 mt-2">{props.mensagem}</p>
                )}
            </div>
            <div className="mt-auto">
                <button 
                    className={`text-white w-full rounded-2xl p-2 xs:p-3 sm:p-4 text-xs xs:text-sm sm:text-base ${props.bgButton}${props.strokeButton ? ` ${props.strokeButton}` : ''} ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
                    onClick={handleClick}
                    disabled={props.disabled}
                >{props.textButton}</button>
            </div>
        </div>
    );
}