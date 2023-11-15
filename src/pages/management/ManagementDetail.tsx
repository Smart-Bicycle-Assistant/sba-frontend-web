import { useLocation } from "react-router-dom";
import Header from "../../components/common/Header";
import { getManagementDetailApi } from "../../apis/bicycle";
import { useEffect, useState } from "react";

type ManagementDetailProps = {
  bicycleId: number;
  recordId: number;
  brakes: number;
  chain: number;
  frontTire: number;
  frontTireLife: number;
  gears: number;
  id: number;
  managementTime: number;
  memberId: string;
  rearTire: number;
  rearTireLife: number;
};

export const ManagementDetail: React.FC = () => {
  const { bicycleId, recordId } = useLocation().state;
  const [managementDetail, setManagementDetail] =
    useState<ManagementDetailProps>();
  // const [managementTime, setManagementTime] = useState<string>("");

  async function getManagementDetail() {
    try {
      const res = await getManagementDetailApi({ bicycleId, recordId });
      setManagementDetail(res.data);
      // const data: Date = managementDetail && managementDetail.managementTime;
      // setManagementTime(data.toLocaleString);
      console.log;
    } catch (error) {
      console.error("Error fetching management detail:", error);
    }
  }

  useEffect(() => {
    getManagementDetail();
  }, []);

  return (
    <div>
      <Header menu="교체/점검 기록 조회" showBackArrow={true} />
      {managementDetail && (
        <div className="p-4 m-3 mb-4 border rounded-md shadow-md">
          <p className="mb-2 font-bold text-md">
            Bicycle ID: {managementDetail.bicycleId}
          </p>
          <p className="text-sm text-gray-700">
            Record ID: {managementDetail.recordId}
          </p>
          {/* 추가 필요한 정보에 따라 렌더링 */}
          {/* 예시로 brakes, chain, frontTire 등의 정보를 출력하도록 함 */}
          <p className="text-sm text-gray-700">
            Brakes: {managementDetail.brakes}
          </p>
          <p className="text-sm text-gray-700">
            Chain: {managementDetail.chain}
          </p>
          <p className="text-sm text-gray-700">
            Front Tire: {managementDetail.frontTire}
          </p>
          {/* 이하 추가 필요한 정보 계속 렌더링 */}
        </div>
      )}
    </div>
  );
};

export default ManagementDetail;
