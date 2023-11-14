import Header from "../../components/common/Header";
import { useLocation, useNavigate } from "react-router-dom";
import PartCard from "../../components/bicycle/PartCard";
import usePartState from "../../hooks/usePartState";
import { BicycleManagementApi, ManagementType } from "../../apis/bicycle";
import { useState } from "react";

export const PartManagement: React.FC<number> = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  async function handleUpdate() {
    const managementData: ManagementType = {
      bicycleId: state,
      frontTire: frontReplace ? 2 : frontCheck ? 1 : 0,
      rearTire: rearReplace ? 2 : rearCheck ? 1 : 0,
      brakes: brakeReplace ? 2 : brakeCheck ? 1 : 0,
      chain: chainReplace ? 2 : chainCheck ? 1 : 0,
      gears: gearReplace ? 2 : gearCheck ? 1 : 0,
      frontTireLife: frontReplace ? Number(frontLife) : 0,
      rearTireLife: rearReplace ? Number(rearLife) : 0,
      managementTime: Date.now(),
    };

    const res = await BicycleManagementApi(managementData);
    console.log(res);
    console.log(res.status);
  }

  const [frontLife, setFrontLife] = useState<number | null>();
  const [rearLife, setRearLife] = useState<number | null>();

  const {
    replace: frontReplace,
    check: frontCheck,
    toggleReplace: frontToggleReplace,
    toggleCheck: frontToggleCheck,
  } = usePartState();

  const {
    replace: rearReplace,
    check: rearCheck,
    toggleReplace: rearToggleReplace,
    toggleCheck: rearToggleCheck,
  } = usePartState();

  const {
    replace: gearReplace,
    check: gearCheck,
    toggleReplace: gearToggleReplace,
    toggleCheck: gearToggleCheck,
  } = usePartState();

  const {
    replace: brakeReplace,
    check: brakeCheck,
    toggleReplace: brakeToggleReplace,
    toggleCheck: brakeToggleCheck,
  } = usePartState();

  const {
    replace: chainReplace,
    check: chainCheck,
    toggleReplace: chainToggleReplace,
    toggleCheck: chainToggleCheck,
  } = usePartState();

  return (
    <div>
      <Header menu="부품 정보 등록" showBackArrow={true} />
      <div className="mx-3">
        <PartCard
          title="앞타이어"
          tire={true}
          replace={frontReplace}
          check={frontCheck}
          setLifeSpan={setFrontLife}
          toggleReplace={frontToggleReplace}
          toggleCheck={frontToggleCheck}
        />

        <PartCard
          title="뒷타이어"
          tire={true}
          replace={rearReplace}
          check={rearCheck}
          setLifeSpan={setRearLife}
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
          <div
            className="text-white py-2.5 px-4 rounded-lg w-full bg-customColor text-center bg-opacity-85 font-semibold"
            onClick={() => {
              handleUpdate();
            }}
          >
            부품 정보 업데이트
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartManagement;
