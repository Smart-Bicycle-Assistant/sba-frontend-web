import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";

const BicycleDetail = () => {
  return (
    <div>
      <Header menu="자전거 상세정보" showBackArrow={true} />
      <div className="flex flex-col items-center p-6">
        <div className="border rounded-md p-4  w-[96%] shadow-sm">
          <div className="flex items-center mb-2">
            <img
              src="../src/assets/Logo1.png"
              alt="자전거 이미지"
              className="w-12 h-12 rounded-full bg-yellow-200"
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-700 text-lg mb-1">
                자전거 1
              </p>
              <p className="text-xs text-gray-500">자전거를 설명하는 글</p>
            </div>
          </div>

          <hr className="my-4" />
          <div className="relative h-60">
            <img
              src="../src/assets/bicycle.png"
              alt="자전거 이미지"
              className="w-40 h-44 mx-auto pt-12"
            />
            <div className="absolute top-0 left-0">
              <div className="text-sm text-gray-700 mb-1">
                <p>타이어</p>
                <div className="flex">
                  <p className="text-xs text-red-400 mr-2">front</p>
                  <p className="text-xs text-gray-500 ml-auto">2023-12-31</p>
                </div>
                <div className="flex">
                  <p className="text-xs text-red-400 mr-2">rear</p>
                  <p className="text-xs text-gray-500 ml-auto">2023-12-31</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="text-sm text-gray-700 mb-1">
                <p>브레이크</p>
                <p className="text-xs text-gray-500">2024-02-28</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0">
              <div className="text-sm text-gray-700 mb-1">
                <p>기어</p>
                <p className="text-xs text-gray-500">2023-11-15</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0">
              <div className="text-sm text-gray-700 mb-1">
                <p>체인</p>
                <p className="text-xs text-gray-500">2023-10-20</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center rounded-md my-3 mx-1">
            <button className="text-white py-2 px-6 text-sm m-2 bg-customColor rounded-md font-normal">
              교체하기
            </button>
            <button className="text-white py-2 px-6 text-sm m-2 bg-customColor rounded-md font-normal">
              점검하기
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default BicycleDetail;
