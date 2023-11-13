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
    <div className="relative flex flex-col items-center p-4 m-3 bg-white border-opacity-25 rounded-lg shadow-sm shadow-gray-300 border-gray-200 border-[1px]">
      <p className="mb-2 font-semibold text-blue-500 text-md">{title}</p>
      <hr className="mb-3 border-gray-200 w-[85%]" />
      <div className="flex space-x-5">
        <button
          className={`px-4 py-1 rounded-full text-sm ${
            replace
              ? "bg-blue-500 text-white font-bold"
              : "bg-white text-blue-500"
          }`}
          onClick={toggleReplace}
        >
          교체
        </button>

        <button
          className={`px-4 py-1 rounded-full text-sm ${
            check
              ? "bg-blue-500 text-white font-bold"
              : "bg-white text-blue-500"
          }`}
          onClick={toggleCheck}
        >
          점검
        </button>
      </div>
      {tire && replace && (
        <div className="mt-1 right-3 bottom-2">
          <span className="pt-2 pr-1 text-[11px] text-blue-500">기대수명 </span>
          <input
            className="mr-2 bg-transparent border-b w-14 border-[#73AAFF] text-right text-blue-500 font-bold text-md pr-1"
            type="number"
            onChange={() => {}}
          />
          <span className="text-xs font-bold text-blue-500">km/h</span>
        </div>
      )}
    </div>
  );
};

export default PartCard;
