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
  let text = "교체";

  switch (type) {
    case 1:
      textColor = "text-green-700";
      text = "점검";
      break;
    case 2:
      textColor = "text-blue-700";
      text = "교체";
      break;
    default:
      textColor = "text-black pl-2";
      text = "-";
      break;
  }

  return (
    <div
      className={`flex bg-sky-50  rounded-lg m-2 flex-col pr-3 py-2 text-[75%] gap-y-4`}
    >
      <div className="flex items-center gap-x-2">
        <div className="w-[73px] px-2 py-1 text-white rounded-lg bg-customColor text-center mx-8">
          {part}
        </div>
        <div className="flex items-center gap-2">
          <p className={`${textColor}`}>{text}</p>
          {type === 2 && lifeSpan && (
            <p className="text-[8px] text-gray-700 mt-[2px]">
              (기대 수명: {lifeSpan}km)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRecordCard;
