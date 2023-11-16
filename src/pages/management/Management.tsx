import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import { useLocation } from "react-router";
import { BicycleManageListApi } from "../../apis/bicycle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Management {
  managementTime: number;
  numFixed: number;
  recordId: number;
}
interface BicycleStatus {
  bicycleName: string;
  brakeExchangeTime: number;
  chainExchangeTime: number;
  frontTireExchangeTime: number;
  frontTireLeftLife: string;
  gearExchangeTime: number;
  rearTireExchangeTime: number;
  rearTireLeftLife: string;
}

const Management = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [managements, setManagements] = useState<Management[]>([]);
  const [bicycleStatus, setBicycleStatus] = useState<BicycleStatus>();

  async function getManagementList() {
    const res = await BicycleManageListApi(state);
    const { status, data } = res;
    const { records, bicycleStatus } = data;
    if (status === 200) {
      setManagements(records);
      setBicycleStatus(bicycleStatus);
    }
  }

  useEffect(() => {
    getManagementList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header menu="자전거 관리" showBackArrow={false} />
      <div className="flex flex-col items-center p-6">
        <button
          className="w-full px-6 py-2 m-2 text-sm font-normal border rounded-md shadow-md "
          onClick={() => {
            navigate("/management/part", { state: state });
          }}
        >
          부품 정보 업데이트
        </button>
        <div className="flex justify-center mx-1 my-3 rounded-md"></div>
        {bicycleStatus && (
          <div className="w-full p-4 mb-4 border rounded-md shadow-md">
            <p className="mb-2 text-lg font-bold">
              {bicycleStatus.bicycleName}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] text-gray-700 mb-2">
                  브레이크 교체일:{" "}
                  {
                    new Date(bicycleStatus.brakeExchangeTime)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
                <p className="text-[12px] text-gray-700 mb-2">
                  체인 교체일:{" "}
                  {
                    new Date(bicycleStatus.chainExchangeTime)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
                <p className="text-[12px] text-gray-700 mb-2">
                  기어 교체일:{" "}
                  {
                    new Date(bicycleStatus.gearExchangeTime)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
              </div>

              <div>
                <p className="text-[12px] text-gray-700 mb-2">
                  앞타이어 교체일:{" "}
                  {
                    new Date(bicycleStatus.frontTireExchangeTime)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
                <p className="text-[12px] text-gray-700 mb-2">
                  앞타이어 기대 수명: {bicycleStatus.frontTireLeftLife}
                </p>
                <p className="text-[12px] text-gray-700 mb-2">
                  뒷타이어 교체일:{" "}
                  {
                    new Date(bicycleStatus.rearTireExchangeTime)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
                <p className="text-[12px] text-gray-700 mb-2">
                  뒷타이어 기대 수명: {bicycleStatus.rearTireLeftLife}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 mb-2 ml-1 font-thin ">부품 교체/점검 기록</div>
        {managements
          .sort((a, b) => b.managementTime - a.managementTime)
          .map((management: Management) => {
            const date: Date = new Date(management.managementTime);
            return (
              <div
                onClick={() => {
                  navigate("/management/detail", {
                    state: {
                      bicycleId: state,
                      recordId: management.recordId,
                    },
                  });
                }}
                key={management.recordId}
                className="w-full p-4 mb-4 border rounded-md shadow-md"
              >
                <p className="mb-2 font-bold text-md">
                  {date.toISOString().split("T")[0]}
                </p>
                <p className="text-[12px] text-gray-700 mb-2">
                  교체한 부품 수: {management.numFixed}
                </p>
              </div>
            );
          })}
      </div>

      <Navbar />
    </div>
  );
};

export default Management;
