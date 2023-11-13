import { Link } from "react-router-dom";
import { BicycleCardProps } from "../../types";

const formatRegistrationDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
function BicycleCard({
  name,
  registrationDate = new Date(),
  image,
}: BicycleCardProps) {
  return (
    <div className="px-5 py-2 border rounded-md shadow-md">
      <div className="flex items-center">
        <img
          src={image}
          alt="logo"
          className="w-12 h-12 mt-3 bg-gray-100 rounded-full"
        />
        <div className="mt-2 ml-4">
          <p className="text-lg font-semibold text-gray-700">{name}</p>
          <p className="text-xs text-gray-500">
            등록일: {formatRegistrationDate(registrationDate)}
          </p>
        </div>
      </div>

      <hr className="my-3" />
      <Link
        to="/bicycle/detail"
        className="block mb-1 text-xs text-center text-blue-500 hover:underline"
      >
        자세히 보기
      </Link>
    </div>
  );
}

export default BicycleCard;
