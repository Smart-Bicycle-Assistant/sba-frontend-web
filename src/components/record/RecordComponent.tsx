import { Link } from 'react-router-dom';
import { formatDate, formatDuration } from '../../utils/format';
import { RecordListType } from '../../types';

type MyPageRecordDetailProps = {
  data: RecordListType;
  openConfirmModal: (id: number) => void;
};

const handleRidingDuration = (ridingDuration: number) => {
  if (ridingDuration > 3600000) {
    return <span>{formatDuration(ridingDuration, 1000 * 60 * 60, '시간')}</span>;
  } else if (ridingDuration > 60000) {
    return <span>{formatDuration(ridingDuration, 1000 * 60, '분')}</span>;
  } else {
    return <span>{formatDuration(ridingDuration, 1000, '초')}</span>;
  }
};

const MyPageRecordDetail: React.FC<MyPageRecordDetailProps> = ({ data, openConfirmModal }) => {
  const { recordId, ridingDistance, ridingDuration, ridingTime } = data;
  return (
    <div className="border rounded-lg shadow-sm">
      <div className="border-b pt-3 pb-4 px-4">
        <div className="flex justify-between text-sm pb-1">
          <div className="flex items-center gap-x-3">
            <div className="flex justify-center items-center w-8 h-8 bg-primary-200 rounded-full">
              <span className="material-symbols-outlined text-primary-default text-lg font-medium">
                directions_bike
              </span>
            </div>
            <p className="font-medium">자전거 1</p>
          </div>
          <div onClick={() => openConfirmModal(recordId)}>
            <span className="material-symbols-outlined text-lg text-slate-400 pb-1">close</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 pl-11 text-xs">
          <div className="flex gap-x-2">
            <p className="text-neutral-500">날짜</p>
            <p>{formatDate(ridingTime, 'DEFAULT')}</p>
          </div>
          <div className="flex gap-x-2">
            <p className="text-neutral-500">주행</p>
            <p>
              총 {handleRidingDuration(ridingDuration)}, {Math.round(ridingDistance * 100) / 100}km
            </p>
          </div>
        </div>
      </div>
      <Link to={`/mypage/record/${recordId}`}>
        <div className="py-3 bg-primary-default rounded-b-lg">
          <p className="text-center text-xs text-white">자세히 보기</p>
        </div>
      </Link>
    </div>
  );
};

export default MyPageRecordDetail;
