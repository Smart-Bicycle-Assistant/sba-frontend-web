import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { RecordOneApi } from '../../apis/myPage';
import { formatToTwoDecimals, formatSpeed } from '../../utils/format';
import { MapPinIcon } from '@heroicons/react/20/solid';
import Chart from 'react-apexcharts';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type RecordDetailType = {
  avgSpeed: number;
  bicycleId: number;
  distance: number;
  id: number;
  map: string;
  maxSpeed: number;
  memberId: string;
  ridingDuration: number;
  ridingTime: number;
};

const MyPageRecordDetail: React.FC = () => {
  const [recordData, setRecordData] = useState<RecordDetailType>();
  const [geometryData, setGeometryData] = useState<[number, number][]>([]);
  const [speedData, setSpeedData] = useState<number[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);
  const { recordNo } = useParams();

  const calculateXAxis = (ridingDuration: number) => {
    let unit = '';
    let divisor = 0;

    if (ridingDuration > 3600000) {
      unit = '시간';
      divisor = 1000 * 60 * 60;
    } else if (ridingDuration > 60000) {
      unit = '분';
      divisor = 1000 * 60;
    } else {
      unit = '초';
      divisor = 1000;
    }

    const interval = formatToTwoDecimals(ridingDuration / divisor) / 7;

    return Array.from(
      { length: 7 },
      (_, index) => String(formatToTwoDecimals((index + 1) * interval)) + unit
    );
  };

  const calculateSpeed = (speed: number[]) => {
    const interval = speed.length / 7;

    const sliceSpeed = Array.from({ length: 7 }, (_, index) =>
      speed.slice(index * interval, (index + 1) * interval)
    );

    return sliceSpeed.map(
      (speedArr) => speedArr.reduce((total, curr) => total + curr, 0) / interval
    );
  };

  const chartState = {
    series: [
      {
        name: '주행 거리',
        data: [10, 41, 35, 51, 49, 62, 69],
      },
      {
        name: '속도',
        data: speedData,
      },
      {
        name: '평균 속도',
        data: [49, 49, 50, 48, 50, 50, 49],
      },
    ],
    options: {
      chart: {
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth' as const,
        width: 3,
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: xAxis,
      },
    },
  };

  useEffect(() => {
    const loadRecordList = async () => {
      const res = await RecordOneApi({ bicycleId: 26, recordId: Number(recordNo) });
      setRecordData(res.data);
      setGeometryData(
        JSON.parse(res.data.map).map((el: { latitude: number; longitude: number }) => [
          el.latitude,
          el.longitude,
        ])
      );
      setSpeedData(calculateSpeed(JSON.parse(res.data.listSpeed)));
      setXAxis(calculateXAxis(res.data.ridingDuration));
    };

    loadRecordList();
  }, []);

  const formatDate = (date: number) => {
    const ridingTime = new Date(date);

    const month = ridingTime.getMonth() + 1;
    const day = ridingTime.getDate();
    const hours = ridingTime.getHours();
    const minutes = ridingTime.getMinutes();

    const formattedTime = `${month}월 ${day}일 ${hours}시 ${minutes}분`;

    return <p>{formattedTime}</p>;
  };

  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu="주행 기록" />
        {recordData && geometryData && (
          <div>
            <div className="flex flex-col gap-y-8 px-8 py-8 mx-auto">
              <div>
                <div className="flex items-center gap-x-2 text-sm pb-3">
                  <div className="w-6 h-6 bg-neutral-200 rounded-full">
                    {/* <img src="" alt="bike"></img> */}
                  </div>
                  <p className="font-base text-xs">자전거 1</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">2023년 8월 15일 주행 기록</p>
                </div>
                <div>
                  <button onClick={() => calculateSpeed(speedData)}>버튼</button>
                </div>
              </div>
              <div>
                <p className="pb-4 font-semibold">경로 다시보기</p>
                <div className="flex justify-center items-center w-full">
                  <div className="w-full rounded-lg">
                    <MapContainer
                      style={{ height: '10rem', borderRadius: '0.5rem' }}
                      center={[geometryData[0][0], geometryData[0][1]]}
                      zoom={15}
                      scrollWheelZoom={true}
                      attributionControl={false}
                      className="leaflet-container"
                    >
                      <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                      />
                      <Polyline positions={geometryData} color={'#0064FF'} />
                    </MapContainer>
                  </div>
                </div>
              </div>
              <div>
                <p className="pb-4 font-semibold">주행 기록</p>
                <div className="bg-primary-100 rounded-lg shadow-sm">
                  <div className="flex flex-col gap-y-4 p-4 text-sm">
                    <div className="flex items-start gap-x-4">
                      <div className="flex items-center gap-x-1.5">
                        <MapPinIcon className="w-5 h-5 text-primary-default" />
                        <p className="px-2.5 py-1 rounded-lg text-white bg-primary-default">출발</p>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <p>{formatDate(recordData.ridingTime)}</p>
                        <p>경기도 어디시 어디구 어디동 17-1</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-x-4">
                      <div className="flex items-center gap-x-1.5">
                        <MapPinIcon className="w-5 h-5 text-primary-default" />
                        <p className="px-2.5 py-1 rounded-lg text-white bg-primary-default">도착</p>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <p>{formatDate(recordData.ridingTime + recordData.ridingDuration)}</p>
                        <p>경기도 거기시 거기구 거기동 426</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="pb-4 font-semibold">주행 통계</p>
                <div className="w-full">
                  <Chart
                    options={chartState.options}
                    series={chartState.series}
                    type="line"
                    width="100%"
                  />
                </div>
                <div className="flex flex-col gap-y-2.5">
                  <div className="flex items-center gap-x-4 p-4 bg-primary-100 rounded-lg shadow-sm text-sm">
                    <p className="px-2.5 py-1 rounded-lg text-white bg-primary-default">
                      주행 거리
                    </p>
                    <p>{formatToTwoDecimals(recordData.distance)}km</p>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 bg-primary-100 rounded-lg shadow-sm text-sm">
                    <p className="px-2.5 py-1 rounded-lg text-white bg-primary-default">
                      최대 속도
                    </p>
                    <p>{formatToTwoDecimals(formatSpeed(recordData.maxSpeed))}km/h</p>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 bg-primary-100 rounded-lg shadow-sm text-sm">
                    <p className="px-2.5 py-1 rounded-lg text-white bg-primary-default">
                      평균 속도
                    </p>
                    <p>{formatToTwoDecimals(recordData.avgSpeed)}km/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageRecordDetail;
