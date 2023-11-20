interface LifeExpectancyProps {
  lifeExpectancyString: string;
}

const LifeExpectancyProgressBar: React.FC<LifeExpectancyProps> = ({
  lifeExpectancyString,
}) => {
  const [value, , total] = lifeExpectancyString.split(" ");

  const numericValue = parseFloat(value);
  const numericUnit = parseInt(total, 10);

  const progress = (numericValue / numericUnit) * 100;

  let colorClass = ``;

  if (progress <= 30) {
    colorClass = "bg-green-500";
  } else if (progress <= 70) {
    colorClass = "bg-blue-500";
  } else if (progress <= 90) {
    colorClass = "bg-orange-500";
  } else {
    colorClass = "bg-red-500";
  }

  return (
    <div className="w-[85%] h-2 ml-6 bg-gray-200 mb-1 rounded-full dark:bg-gray-200">
      <div
        className={`h-2 rounded-full ${colorClass}`}
        style={{ width: `${Math.min(100, progress)}%` }}
      ></div>
    </div>
  );
};

export default LifeExpectancyProgressBar;
