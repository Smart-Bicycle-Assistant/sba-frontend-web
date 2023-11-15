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

const Management = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [managements, setManagements] = useState<Management[]>([]);

  async function getManagementList() {
    const res = await BicycleManageListApi(state);
    if (res.status === 200) setManagements(res.data);
    // console.log(res.data);
  }

  useEffect(() => {
    getManagementList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header menu="자전거 관리" showBackArrow={false} />
      <div className="flex flex-col items-center p-6">
        <div className="flex justify-center mx-1 my-3 rounded-md">
          <button
            className="px-6 py-2 m-2 text-sm font-normal text-white rounded-md shadow-sm bg-customColor"
            onClick={() => {
              navigate("/management/part", { state: state });
            }}
          >
            부품 정보 업데이트
          </button>
        </div>
        <div className="mt-8 mb-2 ml-1 font-thin">부품 교체/점검 기록</div>
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
                <p className="text-[12px] text-gray-700">
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
