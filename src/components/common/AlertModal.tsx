const AlertModal: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-3 justify-center items-center py-1 px-1 bg-white border rounded-2xl">
      <div className="flex flex-col gap-y-2 items-center text-red-500 py-4 px-14 border border-[5px] border-red-500 rounded-xl">
        <div className="flex justify-center items-center p-1 mb-1 bg-red-100 rounded-full">
          <span className="material-symbols-outlined text-5xl">fmd_bad</span>
        </div>
        <div className="flex flex-col items-center gap-y-1">
          <p className="text-2xl font-semibold">위험</p>
          <p className="text-base">후방을 확인하세요!</p>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
