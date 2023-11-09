import Header from '../../components/common/Header';
import { useNavigate } from 'react-router-dom';
import PreRidingBox from '../../components/riding/PreRidingBox';
import { useState } from 'react';
import { useRidingStore } from '../../store/ridingStore';

export const PreRiding: React.FC = () => {
  const [packMode, setpackMode] = useState<boolean>(false);
  const [rearDetection, setRearDetection] = useState<boolean>(false);
  const [targetSpeed, setTargetSpeed] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTargetSpeed(Number(newValue));
  };
  const { setRiding } = useRidingStore();

  const onSubmit = () => {
    if (!(packMode && !targetSpeed)) {
      setRiding({ packMode, targetSpeed, rearDetection });
      console.log(packMode, targetSpeed, rearDetection);
      navigate('/');
    } else {
      console.log('목표 속도를 설정하세요');
    }
  };

  return (
    <div>
      <Header menu="주행 전 설정" showBackArrow={true} />
      <PreRidingBox
        title="팩라이딩"
        content="목표 속도가 비슷한 주변의 유저들을 주행 중 화면에서 확인할 수 있습니다."
        state={packMode}
        onClick={() => setpackMode((prev) => !prev)}
      />

      {packMode && (
        <div className="rounded-lg bg-[#4D93FF] shadow-md py-7 m-4 relative h-32">
          <p className="text-white text-2xl ml-5 font-bold ">목표속력</p>
          <div className="absolute right-3 bottom-2 m-3">
            <input
              className="mr-2 bg-transparent border-b w-10 border-[#73AAFF] text-right text-white font-bold text-xl"
              type="text"
              onChange={handleInputChange}
            ></input>
            <span className="text-white text-lg font-bold">km/h</span>
          </div>
        </div>
      )}
      <PreRidingBox
        title="후방감지"
        content="S_BA 확장 어플리케이션을 통해 주행 중 후방의 차량을 감지한 정보를 화면에서 확인할 수 있습니다."
        state={rearDetection}
        onClick={() => setRearDetection((prev) => !prev)}
      />
      <div className="fixed bottom-0 left-0 right-0 p-4" onClick={onSubmit}>
        <div className=" text-white py-2.5 px-4 rounded-lg w-full bg-customColor text-center bg-opacity-85 font-semibold">
          START
        </div>
      </div>
    </div>
  );
};

export default PreRiding;
