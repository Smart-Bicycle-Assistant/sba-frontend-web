import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { RecordOneApi } from '../../apis/record';
import { useMainBike } from '../../store/userStore';
import { formatToTwoDecimals, formatSpeed, formatDate } from '../../utils/format';
import { getAddr } from '../../utils/map';
import { MapPinIcon } from '@heroicons/react/20/solid';
import Chart from 'react-apexcharts';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapDetail from '../../components/record/MapDetail';

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

  const [startAddr, setStartAddr] = useState<string>('');
  const [endAddr, setEndAddr] = useState<string>('');

  const [openMapDetail, setOpenMapDetail] = useState<boolean>(false);

  const { recordNo } = useParams();
  const { main } = useMainBike();

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

    return sliceSpeed.map((speedArr) =>
      formatToTwoDecimals(formatSpeed(speedArr.reduce((total, curr) => total + curr, 0) / interval))
    );
  };

  const chartState = {
    series: [
      {
        name: '속도',
        data: speedData,
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

  const formatAddr = (
    lat: number,
    lng: number,
    setAddr: React.Dispatch<React.SetStateAction<string>>
  ) => {
    getAddr(lat, lng)
      .then((result) => {
        console.log(result);
        setAddr(result);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    const loadRecordList = async () => {
      const res = await RecordOneApi({
        bicycleId: main,
        recordId: Number(recordNo),
      });
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

  useEffect(() => {
    if (geometryData.length > 0) {
      formatAddr(geometryData[0][0], geometryData[0][1], setStartAddr);
      formatAddr(
        geometryData[geometryData.length - 1][0],
        geometryData[geometryData.length - 1][1],
        setEndAddr
      );

      // calculateGeometry(geometryData);
    }
  }, [geometryData]);

  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu="주행 기록" showBackArrow={true} />
        <div className="relative">
          {recordData && geometryData && (
            <div>
              <div className="flex flex-col px-8 py-8 mx-auto gap-y-8">
                <div>
                  <div className="flex pb-2">
                    <div className="flex items-center gap-x-1.5 text-sm bg-primary-200 rounded-xl px-2 py-0.5">
                      <span className="text-base font-medium material-symbols-outlined text-primary-default">
                        directions_bike
                      </span>
                      <p className="text-xs font-base">자전거 1</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">
                      {formatDate(recordData.ridingTime, 'DEFAULT')} 주행 기록
                    </p>
                  </div>
                </div>
                <div>
                  <p className="pb-4 font-semibold">경로 다시보기</p>
                  <div className="flex items-center justify-center w-full">
                    <div
                      className="relative w-full rounded-lg"
                      onClick={() => setOpenMapDetail(true)}
                    >
                      <MapContainer
                        style={{ height: '10rem', borderRadius: '0.5rem' }}
                        center={[geometryData[0][0], geometryData[0][1]]}
                        zoom={15}
                        minZoom={11}
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
                      <div className="absolute top-0 z-[999] w-full h-full rounded-lg bg-gradient-to-b from-[#ffffff00] from-30% to-slate-700"></div>
                      <div className="absolute flex justify-center bottom-3 w-full text-xs text-white z-[1000]">
                        지도를 클릭하여 자세한 경로를 확인하세요.
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="pb-4 font-semibold">주행 기록</p>
                  <div className="rounded-lg shadow-sm bg-primary-100">
                    <div className="flex flex-col p-4 text-sm gap-y-4">
                      <div className="flex items-start gap-x-4">
                        <div className="flex items-center gap-x-1.5">
                          <MapPinIcon className="w-5 h-5 text-primary-default" />
                          <p className="px-2.5 py-1 rounded-lg text-white bg-primary-default">
                            출발
                          </p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <p>{formatDate(recordData.ridingTime, 'DETAIL')}</p>
                          <p>{startAddr}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-x-4">
                        <div className="flex items-center gap-x-1.5">
                          <MapPinIcon className="w-5 h-5 text-primary-default" />
                          <p className="px-2.5 py-1 rounded-lg text-white bg-primary-default">
                            도착
                          </p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <p>
                            {formatDate(
                              recordData.ridingTime + recordData.ridingDuration,
                              'DETAIL'
                            )}
                          </p>
                          <p>{endAddr}</p>
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
                    <div className="flex items-center p-4 text-sm rounded-lg shadow-sm gap-x-4 bg-primary-100">
                      <p className="px-2.5 py-1 rounded-lg text-white bg-primary-default">
                        주행 거리
                      </p>
                      <p>{formatToTwoDecimals(recordData.distance)}km</p>
                    </div>
                    <div className="flex items-center p-4 text-sm rounded-lg shadow-sm gap-x-4 bg-primary-100">
                      <p className="px-2.5 py-1 rounded-lg text-white bg-primary-default">
                        최대 속도
                      </p>
                      <p>
                        {formatToTwoDecimals(formatSpeed(recordData.maxSpeed))}
                        km/h
                      </p>
                    </div>
                    <div className="flex items-center p-4 text-sm rounded-lg shadow-sm gap-x-4 bg-primary-100">
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
          {openMapDetail && geometryData && (
            <div className="w-full h-screen absolute top-0 left-0 z-[1001]">
              <MapDetail
                latitude={geometryData[0][0]}
                longtitude={geometryData[0][1]}
                geometryData={geometryData}
                setOpenMapDetail={setOpenMapDetail}
              />
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageRecordDetail;
