import { StepType } from '../../types';

type RoutingProps = {
  step: StepType[];
  handleRidingStart: () => void;
};

const Routing: React.FC<RoutingProps> = ({ step, handleRidingStart }) => {
  return (
    <div>
      {step.map((el, index) => (
        <div key={index}>
          <div className="flex items-center justify-between">
            <p className="text-sm">{el.instruction}</p>
            <div className="flex flex-col justify-center">
              <p className="text-xl font-semibold">{el.distance}m</p>
            </div>
          </div>
        </div>
      ))}
      <button
        className="w-full bg-primary-default text-sm text-white py-2.5 mt-3 rounded-lg hover:bg-opacity-80"
        onClick={handleRidingStart}
      >
        주행 시작
      </button>
    </div>
  );
};

export default Routing;
