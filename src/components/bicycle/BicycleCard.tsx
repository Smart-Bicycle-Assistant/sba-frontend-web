import { useNavigate } from 'react-router-dom';
import { Bicycle } from '../../types';
import { useMainBike } from '../../store/userStore';
import { formatToTwoDecimals, formatDate } from '../../utils/format';

type BicycleCardProps = Bicycle & {
  openConfirmModal: (bicycleId: number) => void;
};

const BicycleCard: React.FC<BicycleCardProps> = ({
  bicycleId,
  bicycleName,
  bicycleImage,
  registerTime,
  distance,
  openConfirmModal,
}) => {
  const { setMain } = useMainBike();
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg shadow-sm">
      <div className="flex items-center gap-x-5 border-b p-5">
        <img
          src={bicycleImage}
          alt="logo"
          className="w-12 h-12 bg-primary-200 rounded-full object-contain p-1 "
          onClick={() => {
            setMain(bicycleId);
          }}
        />
        <div className="w-full">
          <div className="flex justify-between text-sm">
            <p className="text-lg font-semibold text-gray-700 pb-2">{bicycleName}</p>
            <div onClick={() => openConfirmModal(bicycleId)}>
              <span className="material-symbols-outlined text-lg text-slate-400 pb-1">close</span>
            </div>
          </div>
          <div className="flex items-center gap-x-2 text-xs pb-1">
            <p className="text-gray-500">등록일</p>
            <p className="text-black">{formatDate(registerTime, 'DEFAULT')}</p>
          </div>
          <div className="flex items-center gap-x-2 text-xs">
            <p className="text-gray-500">주행거리</p>
            <p className="text-black">{formatToTwoDecimals(distance)} km</p>
          </div>
        </div>
      </div>
      <div
        className="py-3 bg-primary-default rounded-b-lg"
        onClick={() => {
          navigate('/management', { state: bicycleId });
        }}
      >
        <p className="text-center text-xs text-white">자세히 보기</p>
      </div>
    </div>
  );
};

export default BicycleCard;
