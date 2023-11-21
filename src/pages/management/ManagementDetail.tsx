import { useLocation } from "react-router-dom";
import Header from "../../components/common/Header";
import { getManagementDetailApi } from "../../apis/bicycle";
import { useEffect, useState } from "react";
import ManageRecordCard from "../../components/management/ManageRecordCard";

type ManagementDetailProps = {
  bicycleId: number;
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

  async function getManagementDetail() {
    try {
      const res = await getManagementDetailApi({ bicycleId, recordId });
      setManagementDetail(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching management detail:", error);
    }
  }

  useEffect(() => {
    getManagementDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header menu="교체/점검 기록 조회" showBackArrow={true} />

      {managementDetail && (
        <div className="p-4 m-3 mb-4 border rounded-md shadow-md">
          <p className="mt-2 mb-3 ml-3 text-sm text-gray-700">
            {
              new Date(managementDetail.managementTime)
                .toISOString()
                .split("T")[0]
            }
          </p>
          <ManageRecordCard
            part="앞타이어"
            type={managementDetail.frontTire}
            lifeSpan={managementDetail.frontTireLife}
          />
          <ManageRecordCard
            part="뒷타이어"
            type={managementDetail.rearTire}
            lifeSpan={managementDetail.rearTireLife}
          />
          <ManageRecordCard part="브레이크" type={managementDetail.brakes} />
          <ManageRecordCard part="체인" type={managementDetail.chain} />
          <ManageRecordCard part="기어" type={managementDetail.gears} />
        </div>
      )}
    </div>
  );
};

export default ManagementDetail;
