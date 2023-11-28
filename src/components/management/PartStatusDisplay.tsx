import { useNavigate } from 'react-router-dom';
import LifeExpectancyProgressBar from '../../components/management/LifeExpectancyProgressBar';
import PartInfo from './PartInfo';

interface PartStatus {
  bicycleName: string;
  brakeExchangeTime: number;
  chainExchangeTime: number;
  gearExchangeTime: number;
  frontTireExchangeTime: number;
  frontTireLeftLife: string;
  rearTireExchangeTime: number;
  rearTireLeftLife: string;
}

interface PartStatusProps {
  partStatus: PartStatus;
  state: number;
}

const PartStatusDisplay: React.FC<PartStatusProps> = ({ partStatus, state }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-2 text-sm">
        <p className="my-4 text-base font-semibold">최근 교체일</p>
        <button
          className="flex items-center text-xs font-normal rounded-md text-opacity-90 text-customColor"
          onClick={() => {
            navigate('/management/part', { state: state });
          }}
        >
          부품 정보 업데이트
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
      <div className="flex flex-col gap-y-6 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-2 pb-3">
          <div className="flex flex-col items-center justify-center w-full text-sm">
            <div>
              <LifeExpectancyProgressBar
                lifeExpectancyString={partStatus.frontTireLeftLife}
                exchangeTime={partStatus.frontTireExchangeTime}
                option="front"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full text-sm">
            <div>
              <div>
                <LifeExpectancyProgressBar
                  lifeExpectancyString={partStatus.rearTireLeftLife}
                  exchangeTime={partStatus.rearTireExchangeTime}
                  option="rear"
                />
              </div>
            </div>
          </div>
        </div>
        <PartInfo label="브레이크" exchangeTime={partStatus.brakeExchangeTime} />
        <PartInfo label="체인" exchangeTime={partStatus.chainExchangeTime} />
        <PartInfo label="기어" exchangeTime={partStatus.gearExchangeTime} />
      </div>
    </div>
  );
};

export default PartStatusDisplay;
