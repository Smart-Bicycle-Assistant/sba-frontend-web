import Header from "../../components/common/Header";
import { GetReportApi } from "../../apis/user";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/format";

type ReportItem = {
  id: number;
  content: string;
  target: string;
  time: number;
  reporter: string;
  solved: number;
};

export const Report: React.FC = () => {
  const [data, setData] = useState<ReportItem[]>([]);

  const getReportList = async () => {
    const response = await GetReportApi();
    setData(response.data);
    console.log(response);
  };

  useEffect(() => {
    getReportList();
  }, []);
  return (
    <div>
      <Header menu="내가 신고한 유저" showBackArrow={true}></Header>
      <div className="m-5">
        {data.map((item) => (
          <div key={item.id} className="relative p-4 mb-4 rounded-lg bg-sky-50">
            <p className="p-1 font-bold text-md">신고 대상: {item.target}</p>
            <p className="p-1 text-sm text-gray-700">
              신고 사유: {item.content}
            </p>
            <p className="p-1 text-xs text-gray-500">
              {formatDate(item.time, "DEFAULT")}
            </p>
            {item.solved === 1 && (
              <div className="absolute px-2 py-1 text-xs text-white bg-blue-300 rounded right-1 top-1">
                처리 완료
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Report;
