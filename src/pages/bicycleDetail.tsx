import Header from "../components/common/header";
import Navbar from "../components/common/navbar";

const BicycleDetail = () => {
  return (
    <div>
      <Header menu="내 자전거" showBackArrow={true} />
      <div className="flex flex-col items-center p-6">
        <div className="border rounded-md p-4  w-[96%]">
          <div className="flex items-center mb-2">
            <img
              src="src/assets/Logo.png"
              alt="자전거 이미지"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-2">
              <p className="font-semibold text-gray-700 text-lg mb-1">
                자전거 1
              </p>
              <p className="text-xs text-gray-500">자전거를 설명하는 글</p>
            </div>
          </div>
          {/* <p className="text-xs text-gray-500 mb-1">등록일: 2023-08-19</p>
          <p className="text-xs text-gray-500">주행기록: 100 km</p>
           */}

          <hr className="my-4" />
          <div className="relative h-60">
            <img
              src="src/assets/bicycle.png"
              alt="자전거 이미지"
              className="w-40 h-40 mx-auto pt-16"
            />
            <div className="absolute top-0 left-0">
              <div className="text-sm text-gray-700 mb-1">
                <p>타이어 교체시기</p>
                <p className="text-xs text-gray-500">2023-12-31</p>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="text-sm text-gray-700 mb-1">
                <p>브레이크 교체시기</p>
                <p className="text-xs text-gray-500">2024-02-28</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0">
              <div className="text-sm text-gray-700 mb-1">
                <p>기어 교체시기</p>
                <p className="text-xs text-gray-500">2023-11-15</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0">
              <div className="text-sm text-gray-700 mb-1">
                <p>체인 교체시기</p>
                <p className="text-xs text-gray-500">2023-10-20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default BicycleDetail;
