import BicycleCard from "../../components/bicycle/BicycleCard";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";

function BicycleMain() {
  return (
    <div>
      <Header menu="내 자전거" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 p-6">
        <BicycleCard
          name="자전거 1"
          registrationDate="2023-08-18"
          mileage="75"
        />
        <BicycleCard
          name="자전거 2"
          registrationDate="2023-08-18"
          mileage="75"
        />
        <a
          href="/bicycle/registration"
          className="text-blue-400 text-center text-xs mt-5"
        >
          새 자전거 등록
        </a>
      </div>
      <Navbar />
    </div>
  );
}

export default BicycleMain;
