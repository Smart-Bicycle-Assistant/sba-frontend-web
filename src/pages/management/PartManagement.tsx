import Header from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import PartCard from "../../components/bicycle/PartCard";
import usePartState from "../../hooks/usePartState";

export const PartManagement: React.FC = () => {
  const navigate = useNavigate();

  const {
    replace: frontReplace,
    check: frontCheck,
    toggleReplace: frontToggleReplace,
    toggleCheck: frontToggleCheck,
  } = usePartState();

  // Rear Part State
  const {
    replace: rearReplace,
    check: rearCheck,
    toggleReplace: rearToggleReplace,
    toggleCheck: rearToggleCheck,
  } = usePartState();

  // Gear Part State
  const {
    replace: gearReplace,
    check: gearCheck,
    toggleReplace: gearToggleReplace,
    toggleCheck: gearToggleCheck,
  } = usePartState();

  // Brake Part State
  const {
    replace: brakeReplace,
    check: brakeCheck,
    toggleReplace: brakeToggleReplace,
    toggleCheck: brakeToggleCheck,
  } = usePartState();

  // Chain Part State
  const {
    replace: chainReplace,
    check: chainCheck,
    toggleReplace: chainToggleReplace,
    toggleCheck: chainToggleCheck,
  } = usePartState();

  return (
    <div>
      <Header menu="부품 정보 등록" showBackArrow={true} />
      <PartCard
        title="앞타이어"
        tire={true}
        replace={frontReplace}
        check={frontCheck}
        toggleReplace={frontToggleReplace}
        toggleCheck={frontToggleCheck}
      />

      <PartCard
        title="뒷타이어"
        tire={true}
        replace={rearReplace}
        check={rearCheck}
        toggleReplace={rearToggleReplace}
        toggleCheck={rearToggleCheck}
      />
      <PartCard
        title="기어"
        replace={gearReplace}
        check={gearCheck}
        toggleReplace={gearToggleReplace}
        toggleCheck={gearToggleCheck}
      />
      <PartCard
        title="브레이크"
        replace={brakeReplace}
        check={brakeCheck}
        toggleReplace={brakeToggleReplace}
        toggleCheck={brakeToggleCheck}
      />
      <PartCard
        title="체인"
        replace={chainReplace}
        check={chainCheck}
        toggleReplace={chainToggleReplace}
        toggleCheck={chainToggleCheck}
      />
      <div
        className="px-3"
        onClick={() => {
          navigate("/bicycle");
        }}
      >
        <div className="text-white py-2.5 px-4 rounded-lg w-full bg-customColor text-center bg-opacity-85 font-semibold">
          부품 정보 업데이트
        </div>
      </div>
    </div>
  );
};

export default PartManagement;
