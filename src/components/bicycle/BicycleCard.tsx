import { Link } from 'react-router-dom';
import { BicycleCardProps } from '../../types';

function BicycleCard({ name, registrationDate, mileage }: BicycleCardProps) {
  return (
    <div className="border rounded-md p-5 pb-3 shadow-md">
      <div className="flex items-center">
        <img
          src={'../../assets/bicycle.png'}
          alt="logo"
          className="w-10 h-10 rounded-full bg-gray-100"
        />
        <p className="ml-2 font-semibold text-gray-700 pb-1">{name}</p>
      </div>
      <p className="text-xs text-gray-500 mb-1 pl-12">
        등록일: {registrationDate}
      </p>
      <p className="text-xs text-gray-500 pl-12">주행기록: {mileage} km</p>
      <hr className="my-3" />
      <Link
        to="/bicycle/detail"
        className="text-blue-500 text-center text-xs hover:underline block"
      >
        자세히 보기
      </Link>
    </div>
  );
}

export default BicycleCard;
