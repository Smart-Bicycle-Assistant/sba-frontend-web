import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import { useLocation } from "react-router";
import { BicycleManageListApi, GetBicycleListApi } from "../../apis/bicycle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bicycle, ManagementStatus, BicycleStatus } from "../../types";
import DownArrowIcon from "../../assets/DownArrowIcon";
import PartStatusDisplay from "../../components/management/PartStatusDisplay";
import RightArrow from "../../assets/rightArrow.svg?react";

const Management = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [managements, setManagements] = useState<ManagementStatus[]>([]);
  const [partStatus, setPartStatus] = useState<BicycleStatus>();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [bicycleList, setBicycleList] = useState<Bicycle[]>([]);
  const [selectedBicycle, setSelectedBicycle] = useState<Bicycle | undefined>();

  async function getManagementList(bicycleId: number) {
    const res = await BicycleManageListApi(bicycleId);
    const { status, data } = res;
    const { records, bicycleStatus } = data;
    if (status === 200) {
      setManagements(records);
      setPartStatus(bicycleStatus);
    }
  }
  async function getBicycle() {
    const res = await GetBicycleListApi();
    setBicycleList(res.data);
  }
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleBicycleChange = (newBicycleId: number) => {
    const selectedBicycleItem = bicycleList.find(
      (bicycle) => bicycle.bicycleId === newBicycleId
    );
    setSelectedBicycle(selectedBicycleItem);
    selectedBicycle && getManagementList(selectedBicycle.bicycleId);
    setDropdownOpen(false);
  };

  useEffect(() => {
    getBicycle();
    getManagementList(state);

    const selectedBicycleItem = bicycleList.find(
      (bicycle) => bicycle.bicycleId === state
    );
    setSelectedBicycle(selectedBicycleItem);
  }, []);

  return (
    <div className="relative">
      <Header menu="자전거 관리" showBackArrow={false} />

      <div className="absolute mt-5 mr-5 right-1">
        <button
          onClick={handleDropdownToggle}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline-gray"
        >
          <span className="pl-1 pr-2">
            {selectedBicycle && selectedBicycle.bicycleName}
          </span>
          <DownArrowIcon />
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 mt-2 origin-top-left bg-white rounded-md shadow-md">
            <div className="py-1">
              {bicycleList.map((bicycle) => (
                <button
                  key={bicycle.bicycleId}
                  onClick={() => handleBicycleChange(bicycle.bicycleId)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {bicycle.bicycleName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center p-6 ">
        <div className="flex justify-center mx-1 my-3 rounded-md"></div>

        {partStatus && (
          <PartStatusDisplay partStatus={partStatus} state={state} />
        )}
        <div className="w-full">
          <div className="flex items-center px-2 text-sm">
            <p className="mt-2 font-semibold text-primary-default">
              부품 정비 기록
            </p>
          </div>
          <div className="w-full py-2">
            {managements
              .sort((a, b) => b.managementTime - a.managementTime)
              .map((management: ManagementStatus) => {
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
                    className="flex p-3 m-2 text-sm transition duration-300 ease-in-out transform rounded-lg cursor-pointer gap-y-4 bg-sky-50 hover:scale-105"
                  >
                    <div className="flex items-center">
                      <p className="px-3 py-1 mr-2 text-white rounded-lg bg-customColor">
                        {date.toISOString().split("T")[0]}
                      </p>
                      <p className="text-[12px] text-gray-700">
                        교체한 부품: {management.numFixed}
                      </p>
                      <p className="absolute text-gray-400 right-5">{">"}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Management;
