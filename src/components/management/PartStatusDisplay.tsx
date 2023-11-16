import { useNavigate } from "react-router-dom";
import LifeExpectancyProgressBar from "../../components/management/LifeExpectancyProgressBar";
import PartInfo from "./PartInfo";

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

const PartStatusDisplay: React.FC<PartStatusProps> = ({
  partStatus,
  state,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex items-center px-2 text-sm ">
        <p className="mb-2 font-semibold text-primary-default">최근 교체일</p>
      </div>
      <div className="p-2 rounded-lg bg-sky-50">
        <PartInfo
          label="브레이크"
          exchangeTime={
            new Date(partStatus.brakeExchangeTime).toISOString().split("T")[0]
          }
        />
        <PartInfo
          label="체인"
          exchangeTime={
            new Date(partStatus.chainExchangeTime).toISOString().split("T")[0]
          }
        />
        <PartInfo
          label="기어"
          exchangeTime={
            new Date(partStatus.gearExchangeTime).toISOString().split("T")[0]
          }
        />

        <div className="text-sm">
          <div className="flex flex-col w-full px-3 py-2 text-sm rounded-lg gap-y-4 bg-sky-50">
            <div className="flex items-center gap-x-2 ">
              <div className="px-3 py-1 mx-8 text-white rounded-lg bg-customColor w-fit">
                앞타이어
              </div>
              <p>
                {
                  new Date(partStatus.frontTireExchangeTime)
                    .toISOString()
                    .split("T")[0]
                }
              </p>
            </div>
            <div className="px-2 ">
              <div className="">
                <LifeExpectancyProgressBar
                  lifeExpectancyString={partStatus.frontTireLeftLife}
                />
                <div className="ml-2 text-center">
                  <p className="text-[10px] text-gray-700 ">
                    {partStatus.frontTireLeftLife}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full px-3 py-2 text-sm rounded-lg gap-y-4 bg-sky-50">
            <div className="flex items-center gap-x-2 ">
              <div className="px-3 py-1 mx-8 text-white rounded-lg bg-customColor w-fit">
                뒷타이어
              </div>
              <p>
                {
                  new Date(partStatus.rearTireExchangeTime)
                    .toISOString()
                    .split("T")[0]
                }
              </p>
            </div>
            <div className="px-2 ">
              <div className="">
                <LifeExpectancyProgressBar
                  lifeExpectancyString={partStatus.rearTireLeftLife}
                />
                <div className="ml-2 text-center">
                  <p className="text-[10px] text-gray-700 ">
                    {partStatus.rearTireLeftLife}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center m-2 text-center ">
        <button
          className="px-3 mb-2 text-[12px] font-normal underline rouded-md text-opacity-90 text-customColor"
          onClick={() => {
            navigate("/management/part", { state: state });
          }}
        >
          부품 정보 업데이트
        </button>
      </div>
    </div>
  );
};

export default PartStatusDisplay;
