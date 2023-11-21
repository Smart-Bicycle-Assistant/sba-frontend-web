const ManageRecordCard = ({
  part,
  type,
  lifeSpan,
}: {
  part: string;
  type: number;
  lifeSpan?: number;
}) => {
  let textColor = "text-gray-700";

  switch (type) {
    case 1:
      textColor = "text-green-700";
      break;
    case 2:
      textColor = "text-blue-700";
      break;
    default:
      break;
  }

  return (
    <div
      className={`flex bg-sky-50  rounded-lg m-2 flex-col pr-3 py-2 text-[75%] gap-y-4 ${textColor}`}
    >
      <div className="flex items-center gap-x-2">
        <div className="w-[73px] px-2 py-1 text-white rounded-lg bg-customColor text-center mx-8">
          {part}
        </div>
        <div className="flex items-center gap-2">
          <p className={`text-${type === 1 ? "green" : "blue"}-700`}>
            {type === 1 ? "점검" : "교체"}
          </p>
          {type === 2 && lifeSpan && (
            <p className="text-[8px] text-gray-700 mt-1">
              (기대 수명: {lifeSpan}km)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRecordCard;
