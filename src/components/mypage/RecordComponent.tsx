import { RecordListType } from "../../types";

type MyPageRecordDetailProps = {
  data: RecordListType;
};

const MyPageRecordDetail: React.FC<MyPageRecordDetailProps> = ({ data }) => {
  const { avgSpeed, recordId, ridingDistance, ridingDuration, ridingTime } =
    data;
  return (
    <div className="border rounded-lg shadow-sm">
      <div className="border-b p-4">
        <div className="flex items-center gap-x-3 text-sm pb-1">
          <div className="w-8 h-8 bg-neutral-200 rounded-full">
            <img src="" alt="bike"></img>
          </div>
          <p className="font-medium">자전거 1</p>
        </div>
        <div className="flex flex-col gap-y-1 pl-11 text-xs">
          <div className="flex gap-x-2">
            <p className="text-neutral-500">날짜</p>
            <p>{ridingTime}</p>
          </div>
          <div className="flex gap-x-2">
            <p className="text-neutral-500">주행</p>
            <p>
              총 {ridingDuration}분, {ridingDistance}km
            </p>
          </div>
        </div>
      </div>
      <a href={`/mypage/record/${recordId}`}>
        <div className="py-3">
          <p className="text-center text-xs">자세히 보기</p>
        </div>
      </a>
    </div>
  );
};

export default MyPageRecordDetail;