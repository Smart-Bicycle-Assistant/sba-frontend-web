import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";

function MyPageModify() {
  return (
    <div className="h-screen">
      <div className="h-auto min-h-screen pb-14">
        <Header menu={"내 정보 수정"} />
      </div>
      <Navbar />
    </div>
  );
}

export default MyPageModify;
