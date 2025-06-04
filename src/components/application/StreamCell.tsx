import RoundedButton from "@/components/ui/roundedbutton";

export default function StreamCell({
  name,
  brief,
  description,
  buttonText,
  onClick,
}: {
  name: string;
  brief: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="relative flex flex-col min-h-0 border border-cyan-400/20 p-6 overflow-hidden h-full w-full">
      {/* Top row */}
      <div className="flex justify-between items-start">
        <h2 className="text-white text-lg font-medium">{name}</h2>
        <span className="text-white/70 text-sm font-light max-w-xs break-words whitespace-pre-line text-right">{brief}</span>
      </div>
      {/* Long description, left aligned */}
      <div className="flex-1 flex items-center">
        <p className="text-white/70 text-base font-light text-left max-w-lg">
          {description}
        </p>
      </div>
      {/* Bottom right button */}
      <div className="absolute bottom-6 right-6">
        <RoundedButton
          color="#30F2F2"
          className="text-black px-6 font-light group"
          onClick={onClick}
        >
          {buttonText}
          <span className="transition-transform duration-200 group-hover:translate-x-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#1C1B1F"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </span>
        </RoundedButton>
      </div>
    </div>
  );
} 