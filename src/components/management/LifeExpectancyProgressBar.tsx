import Chart from 'react-apexcharts';
import { formatDate, formatToTwoDecimals } from '../../utils/format';

interface LifeExpectancyProps {
  lifeExpectancyString: string;
  exchangeTime: number;
  option: string;
}

const LifeExpectancyProgressBar: React.FC<LifeExpectancyProps> = ({
  lifeExpectancyString,
  exchangeTime,
  option,
}) => {
  const [value, , total] = lifeExpectancyString.split(' ');

  const numericValue = parseFloat(value);
  const numericUnit = parseInt(total, 10);

  const progress = (numericValue / numericUnit) * 100;

  const chartState = {
    options: {
      chart: {
        offsetY: -5,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -125,
          endAngle: 125,
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
              offsetY: 50,
              fontSize: '10px',
              formatter: function () {
                return `${formatToTwoDecimals(Number(value))} / ${total} (km)`;
              },
            },
          },
        },
      },
      grid: {
        padding: {
          top: 0,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ['Average Results'],
    },
    series: [progress],
  };

  const progressString = () => {
    if (progress <= 40) {
      return <button className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-500">적정</button>;
    }

    if (progress > 40 && progress <= 80) {
      return <button className="px-2 py-1 rounded-lg bg-amber-100 text-amber-500">양호</button>;
    }

    if (progress > 80) {
      return <button className="px-2 py-1 rounded-lg bg-rose-100 text-rose-500">위험</button>;
    }
  };

  return (
    <div className="w-full">
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="radialBar"
        width="100%"
      />
      <p className="text-center text-[10px] pb-2">{`${formatToTwoDecimals(
        Number(value)
      )} / ${total} (km)`}</p>
      <div className="flex flex-col items-center gap-y-3">
        <div className="w-[75px] px-2 py-1 text-white rounded-lg bg-primary-200 text-center">
          <p className="text-primary-default">{option === 'front' ? '앞타이어' : '뒷타이어'}</p>
        </div>
        <div className="flex justify-center items-center gap-x-1.5">
          <div>{progressString()}</div>
          <p>{formatDate(exchangeTime, 'DEFAULT')}</p>
        </div>
      </div>
    </div>
  );
};

export default LifeExpectancyProgressBar;
