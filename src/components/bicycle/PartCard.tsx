type PartCardProps = {
  title: string;
  tire?: boolean;
  replace: boolean;
  check: boolean;
  toggleReplace: () => void;
  toggleCheck: () => void;
};

const PartCard: React.FC<PartCardProps> = ({
  title,
  tire = false,
  replace,
  check,
  toggleReplace,
  toggleCheck,
}) => {
  return (
    <div className="relative flex flex-col items-center p-4 m-4 bg-blue-500 rounded-lg shadow-md">
      <p className="mb-4 font-semibold text-white text-md">{title}</p>
      <div className="flex space-x-5">
        <button
          className={`px-4 py-1 rounded-full text-sm ${
            replace
              ? "bg-white shadow-inherit font-bold text-blue-500"
              : "bg-blue-500 text-white"
          }`}
          onClick={toggleReplace}
        >
          교체
        </button>

        <button
          className={`px-4 py-1 rounded-full text-sm ${
            check
              ? "bg-white shadow-inherit font-bold text-blue-500"
              : "bg-blue-500 text-white"
          }`}
          onClick={toggleCheck}
        >
          점검
        </button>
      </div>
      {tire && replace && (
        <div className="mt-1 right-3 bottom-2">
          <span className="pt-1 pr-2 text-[11px] text-white">기대수명 </span>
          <input
            className="mr-2 bg-transparent border-b w-14 border-[#73AAFF] text-right text-white font-bold text-md pr-1"
            type="number"
            onChange={() => {}}
          />
          <span className="text-xs font-bold text-white">km/h</span>
        </div>
      )}
    </div>
  );
};

export default PartCard;
