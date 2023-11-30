import { Link } from 'react-router-dom';
import BicycleCard from '../../components/bicycle/BicycleCard';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { GetBicycleListApi, deleteBicycleApi } from '../../apis/bicycle';
import { useEffect, useState } from 'react';
import { Bicycle } from '../../types';

function BicycleMain() {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);

  useEffect(() => {
    getBicycle();
  }, []);

  async function getBicycle() {
    const res = await GetBicycleListApi();
    setBicycles(res.data);
  }

  const deleteBicycle = async (bicycleId: number) => {
    const res = await deleteBicycleApi(bicycleId);

    if (res.status === 200) {
      getBicycle();
    }
  };

  return (
    <div>
      <Header menu="내 자전거" showBackArrow={true} />
      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {bicycles.map((bicycle: Bicycle) => {
          return (
            <BicycleCard
              key={bicycle.bicycleId}
              bicycleId={bicycle.bicycleId}
              bicycleName={bicycle.bicycleName}
              registerTime={bicycle.registerTime}
              bicycleImage={bicycle.bicycleImage}
              distance={bicycle.distance}
              deleteBicycle={deleteBicycle}
            />
          );
        })}
        <Link to="/bicycle/registration" className="mt-5 text-xs text-center text-blue-400">
          새 자전거 등록
        </Link>
      </div>
      <Navbar />
    </div>
  );
}

export default BicycleMain;
