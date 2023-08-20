import Header from "../components/common/header";
import Navbar from "../components/common/navbar";

function BicyclePage() {
  return (
    <div>
      <Header menu="내 자전거" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 p-6">
        <div className="border rounded-md p-5 pb-3 shadow-md">
          <div className="flex items-center">
            <img
              src="src/assets/Logo.png"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <p className="ml-2 font-semibold text-gray-700 pb-1">자전거 1</p>
          </div>
          <p className="text-xs text-gray-500 mb-1 pl-12">등록일: 2023-08-18</p>
          <p className="text-xs text-gray-500 pl-12">주행기록: 75 km</p>
          <hr className="my-3" />
          <a
            href="/bicycle-detail"
            className="text-blue-500 text-center text-xs hover:underline block"
          >
            자세히 보기
          </a>
        </div>

        <div className="border rounded-md p-5 pb-3 shadow-md">
          <div className="flex items-center">
            <img
              src="src/assets/Logo.png"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <p className="ml-2 font-semibold text-gray-700 pb-1">자전거 2</p>
          </div>
          <p className="text-xs text-gray-500 mb-1 pl-12">등록일: 2023-08-18</p>
          <p className="text-xs text-gray-500 pl-12">주행기록: 75 km</p>
          <hr className="my-3" />
          <a
            href="/bicycle-detail"
            className="text-blue-500 text-center text-xs hover:underline block"
          >
            자세히 보기
          </a>
        </div>
        <div className="text-blue-400 text-center text-sm mt-5">
          새 자전거 등록
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default BicyclePage;
