import { useState, useEffect } from 'react';

import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import RecordComponent from '../../components/mypage/RecordComponent';

import { useMainBike } from '../../store/userStore';
import { RecordListApi } from '../../apis/myPage';
import { RecordComponentType } from '../../types';

const MyPageRecordAll: React.FC = () => {
  const [recordList, setRecordList] = useState<RecordComponentType[]>([]);

  const { main } = useMainBike();

  useEffect(() => {
    const loadRecordList = async () => {
      const res = await RecordListApi(main);
      console.log(res);
      setRecordList(res.data);
    };
    loadRecordList();
  }, []);

  return (
    <div className="content_wrapper">
      <div className="content_fixed">
        <Header menu={'주행 기록'} />
        <div className="content">
          {recordList && (
            <div className="flex flex-col gap-y-3">
              {recordList.map((el, index) => (
                <div key={index}>
                  <RecordComponent data={el} />
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
