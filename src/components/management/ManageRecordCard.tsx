const ManageRecordCard = ({
  part,
  type,
  lifeSpan,
}: {
  part: string;
  type: number;
  lifeSpan?: number;
}) => {
  return (
    <div
      className={`flex bg-primary-100 rounded-lg flex-col px-4 py-3 text-sm gap-y-4`}
    >
      <div className="flex items-center gap-x-4">
        <div className="w-[73px] px-2 py-1 text-white rounded-lg bg-customColor text-center">
          {part}
        </div>
        <div className="flex items-center gap-2">
          {type === 0 && <p className="text-slate-700">해당 없음</p>}
          {type === 1 && <p className="text-green-700">점검</p>}
          {type === 2 && <p className="text-blue-700">교체</p>}
          {type === 3 && <p className="text-blue-700">최초 입력</p>}
          {type === 2 && lifeSpan && (
            <p className="text-[10px] text-gray-700 mt-1">
              (기대 수명: {lifeSpan}km)
            </p>
          )}
          {type === 3 && lifeSpan && (
            <p className="text-[10px] text-gray-700 mt-1">
              (기대 수명: {lifeSpan}km)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRecordCard;
