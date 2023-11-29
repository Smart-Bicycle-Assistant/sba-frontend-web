import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { BicycleManageListApi, GetBicycleListApi, deleteManagementApi } from '../../apis/bicycle';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bicycle, ManagementStatus, BicycleStatus } from '../../types';
import DownArrowIcon from '../../assets/DownArrowIcon';
import { useMainBike } from '../../store/userStore';
import PartStatusDisplay from '../../components/management/PartStatusDisplay';

const Management = () => {
  const { main } = useMainBike();
  const navigate = useNavigate();
  const [managements, setManagements] = useState<ManagementStatus[]>([]);
  const [partStatus, setPartStatus] = useState<BicycleStatus>();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [bicycleList, setBicycleList] = useState<Bicycle[]>([]);
  const [selectedBicycle, setSelectedBicycle] = useState<Bicycle | undefined>();

  const forceUpdateRef = useRef<() => void>(() => {});
  const forceUpdate = () => forceUpdateRef.current();

  async function getManagementList(bicycleId: number) {
    const res = await BicycleManageListApi(bicycleId);
    const { status, data } = res;
    const { records, bicycleStatus } = data;
    console.log(data);
    if (status === 200) {
      setManagements(records);
      setPartStatus(bicycleStatus);
    }
  }
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleBicycleChange = (newBicycleId: number) => {
    const selectedBicycleItem = bicycleList.find((bicycle) => bicycle.bicycleId === newBicycleId);
    setSelectedBicycle(selectedBicycleItem);
    getManagementList(newBicycleId);
    forceUpdate();
  };

  const fetchData = async () => {
    const bicycleData = await GetBicycleListApi();
    setBicycleList(bicycleData.data);
    if (main) {
      const selectedBicycleItem = bicycleData.data.find(
        (bicycle: { bicycleId: number }) => bicycle.bicycleId === main
      );
      setSelectedBicycle(selectedBicycleItem);
      getManagementList(main);
    } else {
      const selectedBicycleItem = bicycleData.data[0].bicycleId;
      setSelectedBicycle(selectedBicycleItem);
      getManagementList(bicycleData.data[0].bicycleId);
    }
  };

  const deleteManagementList = async (recordId: number) => {
    const res = await deleteManagementApi(recordId);

    if (res.status === 200) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [main]);

  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu="자전거 관리" showBackArrow={true} />
        <div className="relative flex justify-end mt-5 mr-5">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline-gray"
          >
            <span className="w-16 pl-1 pr-2">{selectedBicycle && selectedBicycle.bicycleName}</span>
            <DownArrowIcon />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full w-[104px] mt-2 text-center origin-top-left bg-white rounded-md shadow-md">
              <div className="py-1">
                {bicycleList.map((bicycle) => (
                  <button
                    key={bicycle.bicycleId}
                    onClick={() => {
                      handleBicycleChange(bicycle.bicycleId);
                      setDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {bicycle.bicycleName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center px-6">
          <div className="w-full flex flex-col items-center gap-y-6 pt-10 pb-6">
            <img src={selectedBicycle?.bicycleImage} className="w-3/4" />
            <div className="text-xl font-semibold">{selectedBicycle?.bicycleName}</div>
          </div>
          {selectedBicycle && partStatus && (
            <PartStatusDisplay partStatus={partStatus} state={selectedBicycle.bicycleId} />
          )}
          <div className="w-full pt-3 py-6">
            <div className="flex items-center px-2 text-sm">
              <p className="my-4 font-semibold text-base">부품 정비 기록</p>
            </div>
            <div className="w-full py-1">
              {managements
                .sort((a, b) => b.managementTime - a.managementTime)
                .map((management: ManagementStatus) => {
                  const date: Date = new Date(management.managementTime);
                  console.log(management.recordId);
                  return (
                    <div
                      key={management.recordId}
                      className="flex px-4 py-4 m-2 text-sm transition duration-300 ease-in-out transform rounded-xl cursor-pointer gap-y-4 bg-primary-100 hover:scale-105"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div
                          className="flex items-center gap-x-4"
                          onClick={() => {
                            navigate('/management/detail', {
                              state: {
                                bicycleId: selectedBicycle?.bicycleId,
                                bicycleName: selectedBicycle?.bicycleName,
                                recordId: management.recordId,
                              },
                            });
                          }}
                        >
                          <p className="px-3 py-1 text-white rounded-xl bg-customColor">
                            {date.toISOString().split('T')[0]}
                          </p>
                          <p className="text-sm">교체한 부품: {management.numFixed}</p>
                        </div>
                        <div onClick={() => deleteManagementList(management.recordId)}>
                          <span className="material-symbols-outlined text-lg text-slate-400">
                            close
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Management;
