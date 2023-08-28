import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import { MapPinIcon } from "@heroicons/react/20/solid";

const MyPageRecordDetail: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu="주행 기록" />
        <div className="flex flex-col gap-y-8 px-8 py-8 mx-auto">
          <div>
            <div className="flex items-center gap-x-2 text-sm pb-1">
              <div className="w-6 h-6 bg-neutral-200 rounded-full">
                {/* <img src="" alt="bike"></img> */}
              </div>
              <p className="font-base text-xs">자전거 1</p>
            </div>
            <div>
              <p className="text-xl font-semibold">2023년 8월 15일 주행 기록</p>
            </div>
          </div>
          <div>
            <p className="pb-3 text-sm font-semibold">경로 다시보기</p>
            <div className="flex justify-center items-center w-full h-36 bg-neutral-200 rounded-lg">
              <p className="text-xs">
                클릭하여 더 자세한 데이터를 확인해 보세요
              </p>
            </div>
          </div>
          <div>
            <p className="pb-3 text-sm font-semibold">주행 기록</p>
            <div className="border rounded-lg shadow-sm">
              <div className="flex flex-col gap-y-3 p-4 text-xs">
                <div className="flex items-start gap-x-3">
                  <div className="flex items-center gap-x-1">
                    <MapPinIcon className="w-5 h-5" />
                    <p>출발</p>
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <p>3시 5분</p>
                    <p>경기도 어디시 어디구 어디동 17-1</p>
                  </div>
                </div>
                <div className="flex items-start gap-x-3">
                  <div className="flex items-center gap-x-1">
                    <MapPinIcon className="w-5 h-5" />
                    <p>도착</p>
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <p>3시 35분</p>
                    <p>경기도 거기시 거기구 거기동 426</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">주행 통계</p>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageRecordDetail;
