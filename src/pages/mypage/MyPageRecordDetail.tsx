import Header from "../../components/common/header";
import Navbar from "../../components/common/navbar";

const MyPageRecordDetail: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu={"주행 기록"} />
      </div>
      <Navbar />
    </div>
  );
};

export default MyPageRecordDetail;
