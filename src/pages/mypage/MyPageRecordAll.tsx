import { useEffect } from "react";

import Header from "../../components/common/header";
import Navbar from "../../components/common/navbar";

import { recordListApi } from "../../apis/myPage";

const MyPageRecordAll: React.FC = () => {
  useEffect(() => {
    const loadRecordList = async () => {
      const res = await recordListApi({ memberId: "test1", bicycleNo: 0 });
      console.log(res);
    };
    loadRecordList();
  }, []);
  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu={"주행 기록"} />
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageRecordAll;
