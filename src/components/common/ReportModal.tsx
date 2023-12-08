import { useState } from "react";

type ReportModalProps = {
  setOpenModal: (state: boolean) => void;
  deleteHandler: (content: string) => void;
};

const ReportModal: React.FC<ReportModalProps> = ({
  setOpenModal,
  deleteHandler,
}) => {
  const [reportContent, setReportContent] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportContent(e.target.value);
  };
  const ReportHandler = () => {
    deleteHandler(reportContent);
    setOpenModal(false);
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="px-12 py-8 text-center">
        <p className="pb-1 text-base font-semibold">
          해당 유저를 신고하시겠습니까?
        </p>
        <p className="text-xs text-slate-500">이 작업은 되돌릴 수 없습니다.</p>
        <input
          type="text"
          value={reportContent}
          onChange={handleInputChange}
          placeholder="신고 사유를 입력하세요"
          className="w-full p-2 mt-5 text-xs border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid w-full grid-cols-2">
        <button
          className="rounded-bl-lg bg-primary-default text-xs text-white hover:bg-primary-900 py-2.5"
          onClick={ReportHandler}
        >
          확인
        </button>
        <button
          className="rounded-br-lg bg-slate-400 text-xs text-white hover:bg-primary-900 py-2.5"
          onClick={() => setOpenModal(false)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
