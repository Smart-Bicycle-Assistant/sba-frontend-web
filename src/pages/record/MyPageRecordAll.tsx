import { useState, useEffect } from 'react';

import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import RecordComponent from '../../components/record/RecordComponent';
import ConfirmModal from '../../components/common/ConfirmModal';

import { useMainBike } from '../../store/userStore';
import { RecordListApi, deleteRecordApi } from '../../apis/record';
import { RecordComponentType } from '../../types';

const MyPageRecordAll: React.FC = () => {
  const [recordList, setRecordList] = useState<RecordComponentType[]>([]);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [deleteRecordId, setDeleteRecordId] = useState<number>(0);

  const { main } = useMainBike();

  useEffect(() => {
    loadRecordList();
  }, []);

  const loadRecordList = async () => {
    const res = await RecordListApi(main);
    console.log(res);
    setRecordList(res.data);
  };

  const deleteRecordList = async () => {
    const res = await deleteRecordApi(deleteRecordId);
    if (res.status === 200) {
      loadRecordList();
    }
  };

  const openConfirmModal = (id: number) => {
    setConfirmModal(true);
    setDeleteRecordId(id);
  };

  return (
    <div className="content_wrapper">
      <div className="content_fixed">
        <Header menu={'주행 기록'} showBackArrow={true} />
        <div className="content">
          {recordList && (
            <div className="flex flex-col gap-y-4">
              {recordList.map((el, index) => (
                <div key={index}>
                  <RecordComponent data={el} openConfirmModal={openConfirmModal} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Navbar />
      {confirmModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-lg">
          <div className="flex flex-col gap-y-3 animate-fade-in-down">
            <ConfirmModal setOpenModal={setConfirmModal} deleteHandler={deleteRecordList} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageRecordAll;
