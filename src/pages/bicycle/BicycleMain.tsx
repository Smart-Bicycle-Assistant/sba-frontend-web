import { Link } from "react-router-dom";
import BicycleCard from "../../components/bicycle/BicycleCard";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import { GetBicycleListApi } from "../../apis/bicycle";
import { useEffect, useState } from "react";

export interface Bicycle {
  id: number;
  bicycleName: string;
  bicycleImage: string;
  registrationDate?: string;
}

function BicycleMain() {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);

  useEffect(() => {
    getBicycle();
  }, []);

  async function getBicycle() {
    try {
      const res = await GetBicycleListApi();
      console.log(res.data);
      setBicycles(res.data);
    } catch (error) {
      console.error("Error fetching bicycle data:", error);
    }
  }

  return (
    <div>
      <Header menu="내 자전거" />
      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {bicycles.map((bicycle: Bicycle) => (
          <BicycleCard
            key={bicycle.id}
            name={bicycle.bicycleName}
            image={bicycle.bicycleImage}
          />
        ))}
        <Link
          to="/bicycle/registration"
          className="mt-5 text-xs text-center text-blue-400"
        >
          새 자전거 등록
        </Link>
      </div>
      <Navbar />
    </div>
  );
}

export default BicycleMain;
