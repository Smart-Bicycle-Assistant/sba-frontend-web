import { Link } from 'react-router-dom';
import BicycleCard from '../../components/bicycle/BicycleCard';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import ConfirmModal from '../../components/common/ConfirmModal';
import { GetBicycleListApi, deleteBicycleApi } from '../../apis/bicycle';
import { useEffect, useState } from 'react';
import { Bicycle } from '../../types';

function BicycleMain() {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [deleteBicycleId, setDeleteBicycleId] = useState<number>(0);

  useEffect(() => {
    getBicycle();
  }, []);

  async function getBicycle() {
    const res = await GetBicycleListApi();
    setBicycles(res.data);
  }

  const deleteBicycle = async () => {
    const res = await deleteBicycleApi(deleteBicycleId);

    if (res.status === 200) {
      getBicycle();
    }
  };

  const openConfirmModal = (id: number) => {
    setConfirmModal(true);
    setDeleteBicycleId(id);
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
              openConfirmModal={openConfirmModal}
            />
          );
        })}
        <Link to="/bicycle/registration" className="mt-5 text-xs text-center text-blue-400">
          새 자전거 등록
        </Link>
      </div>
      <Navbar />
      {confirmModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-lg">
          <div className="flex flex-col gap-y-3 animate-fade-in-down">
            <ConfirmModal setOpenModal={setConfirmModal} deleteHandler={deleteBicycle} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BicycleMain;
