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
    <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-200">
      <div
        className={`h-2.5 rounded-full ${colorClass}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LifeExpectancyProgressBar;
