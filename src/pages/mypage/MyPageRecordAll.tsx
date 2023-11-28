import { useState, useEffect } from 'react';

import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import RecordComponent from '../../components/mypage/RecordComponent';

import { useMainBike } from '../../store/userStore';
import { RecordListApi, deleteRecordApi } from '../../apis/myPage';
import { RecordComponentType } from '../../types';

const MyPageRecordAll: React.FC = () => {
  const [recordList, setRecordList] = useState<RecordComponentType[]>([]);

  const { main } = useMainBike();

  useEffect(() => {
    loadRecordList();
  }, []);

  const loadRecordList = async () => {
    const res = await RecordListApi(main);
    console.log(res);
    setRecordList(res.data);
  };

  const deleteRecordList = async (recordId: number) => {
    const res = await deleteRecordApi(recordId);
    if (res.status === 200) {
      loadRecordList();
    }
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
                  <RecordComponent data={el} deleteRecordList={deleteRecordList} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageRecordAll;
