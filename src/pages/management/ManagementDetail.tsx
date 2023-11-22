import { useLocation } from "react-router-dom";
import Header from "../../components/common/Header";
import { getManagementDetailApi } from "../../apis/bicycle";
import { useEffect, useState } from "react";
import ManageRecordCard from "../../components/management/ManageRecordCard";
import { formatDate } from "../../utils/format";

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
  const { bicycleId, bicycleName, recordId } = useLocation().state;
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
        <>
          <div className="p-4 m-3 mb-4 ">
            <div className="flex">
              <div className="flex items-center text-sm bg-primary-200 rounded-xl px-3 py-0.5 mx-2 mt-3">
                <span className="pr-2 text-base font-medium material-symbols-outlined text-primary-default">
                  directions_bike
                </span>
                <p className="text-xs font-base">{bicycleName}</p>
              </div>
            </div>
            <p className="mt-2 mb-4 ml-3 text-xl font-semibold text-gray-700">
              {formatDate(managementDetail.managementTime, "DEFAULT")} 교체/점검
              기록
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
        </>
      )}
    </div>
  );
};

export default ManagementDetail;
