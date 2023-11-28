import { BicycleType } from '../../types';

type BicycleSwiperProps = {
  bicycle: BicycleType;
  activeIndex: number;
  index: number;
};

const BicycleSwiper: React.FC<BicycleSwiperProps> = ({ bicycle, activeIndex, index }) => {
  return (
    <div className="h-[55vh] p-[4.2vh] mx-2 mb-10 bg-white shadow-lg rounded-3xl">
      <div className="flex gap-x-2">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-200">
          <p className="text-sm font-semibold text-primary-default">{index + 1}</p>
        </div>
        {activeIndex === index && (
          <div className="flex items-center justify-center px-2 border rounded-full border-rose-500">
            <p className="text-sm font-semibold text-rose-500">선택됨</p>
          </div>
        )}
      </div>
      <div className="py-[2vh] text-xl font-semibold">{bicycle.bicycleName}</div>
      <div className="h-[35vh] flex items-center justify-center">
        <img src={bicycle.bicycleImage} alt="main" className="w-full h-[24vh] object-cover"></img>
      </div>
    </div>
  );
};

export default BicycleSwiper;
