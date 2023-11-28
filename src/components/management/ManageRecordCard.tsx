const ManageRecordCard = ({
  part,
  type,
  lifeSpan,
}: {
  part: string;
  type: number;
  lifeSpan?: number;
}) => {
  let textColor = 'text-gray-700';

  switch (type) {
    case 1:
      textColor = 'text-green-700';
      break;
    case 2:
      textColor = 'text-blue-700';
      break;
    default:
      textColor = 'text-black pl-2';
      break;
  }

  return (
    <div
      className={`flex bg-primary-100 rounded-lg flex-col px-4 py-3 text-sm gap-y-4 ${textColor}`}
    >
      <div className="flex items-center gap-x-4">
        <div className="w-[73px] px-2 py-1 text-white rounded-lg bg-customColor text-center">
          {part}
        </div>
        <div className="flex items-center gap-2">
          <p className={`text-${type === 1 ? 'green' : 'blue'}-700`}>
            {type === 1 ? '점검' : '교체'}
          </p>
          {type === 2 && lifeSpan && (
            <p className="text-[10px] text-gray-700 mt-1">(기대 수명: {lifeSpan}km)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRecordCard;
