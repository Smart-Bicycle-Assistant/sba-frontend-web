import Sample from '../../assets/sample.png';
import { BicycleType } from '../../types';

type BicycleSwiperProps = {
  bicycle: BicycleType;
  index: number;
};

const BicycleSwiper: React.FC<BicycleSwiperProps> = ({ bicycle, index }) => {
  return (
    <div className="p-8 mx-2 mb-10 bg-white shadow-lg rounded-3xl">
      <div className="flex gap-x-2">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-200">
          <p className="text-sm font-semibold text-primary-default">{index + 1}</p>
        </div>
        <div className="flex items-center justify-center px-2 border rounded-full border-rose-500">
          <p className="text-sm font-semibold text-rose-500">메인</p>
        </div>
      </div>
      <div className="py-4 text-xl font-semibold">{bicycle.bicycleName}</div>
      <div className="flex justify-center py-16">
        <img src={Sample} alt="main"></img>
      </div>
    </div>
  );
};

export default BicycleSwiper;
