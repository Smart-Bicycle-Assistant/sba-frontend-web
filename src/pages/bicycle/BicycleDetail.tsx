import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import bicycle from "../../assets/Logo.png";
import { useLocation } from "react-router";
import { BicycleManageListApi } from "../../apis/bicycle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Management {
  managementTime: number;
  numFixed: number;
  recordId: number;
}

const BicycleDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [managements, setManagements] = useState<Management[]>([]);

  async function getManagementList() {
    const res = await BicycleManageListApi(state);
    if (res.status === 200) setManagements(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    getManagementList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header menu="자전거 상세정보" showBackArrow={true} />
      <div className="flex flex-col items-center p-6">
        <div className="border rounded-md p-4  w-[96%] shadow-sm">
          <div className="flex items-center mb-2">
            <img
              src={bicycle}
              alt="자전거 이미지"
              className="w-12 h-12 bg-gray-100 rounded-full"
            />
            <div className="ml-3">
              <p className="mb-1 text-lg font-semibold text-gray-700">
                자전거 1
              </p>
            </div>
          </div>
          <button
            className="px-4 py-2 m-2 text-sm font-normal border rounded-md shadow-sm text-customColor"
            onClick={() => {
              navigate("/management/part", { state: state });
            }}
          >
            부품 정보 업데이트
          </button>

          <hr className="my-4" />
          {/* <div className="relative h-60">
            <img
              src={bicycle}
              alt="자전거 이미지"
              className="w-40 pt-12 mx-auto h-44"
            />
            <div className="absolute top-0 left-0">
              <div className="mb-1 text-sm text-gray-700">
                <p>타이어</p>
                <div className="flex">
                  <p className="mr-2 text-xs text-red-400">front</p>
                  <p className="ml-auto text-xs text-gray-500">2023-12-31</p>
                </div>
                <div className="flex">
                  <p className="mr-2 text-xs text-red-400">rear</p>
                  <p className="ml-auto text-xs text-gray-500">2023-12-31</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="mb-1 text-sm text-gray-700">
                <p>브레이크</p>
                <p className="text-xs text-gray-500">2024-02-28</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0">
              <div className="mb-1 text-sm text-gray-700">
                <p>기어</p>
                <p className="text-xs text-gray-500">2023-11-15</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0">
              <div className="mb-1 text-sm text-gray-700">
                <p>체인</p>
                <p className="text-xs text-gray-500">2023-10-20</p>
              </div>
            </div>
          </div> */}
          <div className="flex justify-center mx-1 my-3 rounded-md"></div>
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
                  className="p-4 mb-4 border rounded-md shadow-md"
                >
                  <p className="mb-2 font-bold text-md">
                    {date.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">
                    교체한 부품 수: {management.numFixed}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default BicycleDetail;
