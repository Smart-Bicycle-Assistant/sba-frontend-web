import { useState } from "react";
import { useRidingStore } from "../../store/ridingStore";

type PackModalProps = {
  toggleModalHandler: () => void;
};

const PackModal: React.FC<PackModalProps> = ({ toggleModalHandler }) => {
  const [temp, setTemp] = useState<number>(0);

  const { setTargetSpeed } = useRidingStore((state) => state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTemp(Number(value));
  };

  const handleInputClick = () => {
    setTargetSpeed(Number(temp));
    toggleModalHandler();
  };

  return (
    <div className="flex flex-col items-center justify-center px-3 bg-white border gap-y-6 py-7 rounded-xl">
      <div>
        <p className="text-base font-semibold">목표속력을 설정하세요.</p>
      </div>
      <div className="flex justify-center gap-x-3">
        <input
          className="w-1/4 bg-transparent border-b border-[#73AAFF] text-right text-primary-default font-bold text-lg"
          type="number"
          placeholder="0"
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            if (inputValue >= 0) {
              handleInputChange(e);
            }
          }}
          value={temp}
        ></input>
        <span className="text-lg font-bold text-primary-default">km/h</span>
      </div>
      <div>
        <button
          className="px-5 py-1 text-xs text-white rounded-full bg-primary-default hover:bg-primary-900"
          onClick={() => handleInputClick()}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PackModal;
