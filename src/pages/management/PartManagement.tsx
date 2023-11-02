import Header from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import chainBox from "../../assets/chain.svg";
import breakBox from "../../assets/brake.svg";
import gearBox from "../../assets/gear.svg";
import tirenBox from "../../assets/tire.svg";

export const PartManagement: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header menu="부품 정보 등록" />
      <div className="my-2">
        <img src={tirenBox} className="px-3 w-auto" />
        <img src={breakBox} className="px-3 h-1/6" />
        <img src={chainBox} className="px-3 h-1/6" />
        <img src={gearBox} className="px-3 h-1/6" />
      </div>
      <div
        className="px-3"
        onClick={() => {
          navigate("/bicycle");
        }}
      >
        <div className=" text-white py-2.5 px-4 rounded-lg w-full bg-customColor text-center bg-opacity-85 font-semibold">
          새 자전거 등록
        </div>
      </div>
    </div>
  );
};

export default PartManagement;
