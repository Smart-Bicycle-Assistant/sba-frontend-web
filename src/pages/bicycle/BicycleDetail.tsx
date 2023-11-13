import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import bicycle from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
const BicycleDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header menu="자전거 상세정보" showBackArrow={true} />
      <div className="flex flex-col items-center p-6">
        <div className="border rounded-md p-4  w-[96%] shadow-sm">
          <div className="flex items-center mb-2">
            <img
              src={bicycle}
              alt="자전거 이미지"
              className="w-12 h-12 bg-gray-100 rounded-full"
            />
            <div className="ml-3">
              <p className="mb-1 text-lg font-semibold text-gray-700">
                자전거 1
              </p>
            </div>
          </div>

          <hr className="my-4" />
          <div className="relative h-60">
            <img
              src={bicycle}
              alt="자전거 이미지"
              className="w-40 pt-12 mx-auto h-44"
            />
            <div className="absolute top-0 left-0">
              <div className="mb-1 text-sm text-gray-700">
                <p>타이어</p>
                <div className="flex">
                  <p className="mr-2 text-xs text-red-400">front</p>
                  <p className="ml-auto text-xs text-gray-500">2023-12-31</p>
                </div>
                <div className="flex">
                  <p className="mr-2 text-xs text-red-400">rear</p>
                  <p className="ml-auto text-xs text-gray-500">2023-12-31</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="mb-1 text-sm text-gray-700">
                <p>브레이크</p>
                <p className="text-xs text-gray-500">2024-02-28</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0">
              <div className="mb-1 text-sm text-gray-700">
                <p>기어</p>
                <p className="text-xs text-gray-500">2023-11-15</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0">
              <div className="mb-1 text-sm text-gray-700">
                <p>체인</p>
                <p className="text-xs text-gray-500">2023-10-20</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mx-1 my-3 rounded-md">
            <button
              className="px-6 py-2 m-2 text-sm font-normal text-white rounded-md shadow-sm bg-customColor"
              onClick={() => {
                navigate("/management/part");
              }}
            >
              부품 정보 업데이트
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default BicycleDetail;
