import toggleOn from "../../assets/toggleOn.svg";
import toggleOff from "../../assets/toggleOff.svg";

interface PreRidingBoxProps {
  title: string;
  content: string;
  state: boolean;
  onClick: () => void;
}

const PreRidingBox: React.FC<PreRidingBoxProps> = ({
  title,
  content,
  state,
  onClick,
}) => {
  return (
    <div className="rounded-lg bg-[#4D93FF] shadow-md py-7 m-4 relative">
      <p className="ml-5 text-2xl font-bold text-white">{title}</p>
      <p className="text-white text-[10px] mx-5 font-light mb-10">{content}</p>
      <img
        src={state ? toggleOn : toggleOff}
        className="absolute m-3 right-2 bottom-2 w-14"
        onClick={onClick}
      />
    </div>
  );
};

export default PreRidingBox;
