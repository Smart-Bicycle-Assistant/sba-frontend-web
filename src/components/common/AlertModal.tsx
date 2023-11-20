const AlertModal: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center px-1 py-1 bg-white border gap-y-3 rounded-2xl">
      <div className="flex flex-col gap-y-2 items-center text-red-500 py-4 px-14 border-[5px] border-red-500 rounded-xl">
        <div className="flex items-center justify-center p-1 mb-1 bg-red-100 rounded-full">
          <span className="text-5xl material-symbols-outlined">fmd_bad</span>
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
