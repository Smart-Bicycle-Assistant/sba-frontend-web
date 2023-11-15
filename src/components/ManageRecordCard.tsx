const ManageRecordCare = ({
  part,
  type,
  lifeSpan,
}: {
  part: string;
  type: number;
  lifeSpan?: number;
}) => {
  switch (type) {
    case 1:
      return <p className="text-sm text-gray-700">{part} - 점검</p>;
    case 2:
      return (
        <div className="my-3 text-sm text-gray-700">
          {part} - 교체
          {lifeSpan && <p>기대 수명: {lifeSpan}km</p>}
        </div>
      );
    default:
      return null;
  }
};

export default ManageRecordCare;
