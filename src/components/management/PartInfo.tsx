interface PartInfoProps {
  label: string;
  exchangeTime: string;
}

const PartInfo: React.FC<PartInfoProps> = ({ label, exchangeTime }) => {
  return (
    <div className="flex flex-col w-full pr-3 py-2 text-[75%] gap-y-4">
      <div className="flex items-center gap-x-2">
        <div className="w-[73px] px-3 py-1 text-white rounded-lg bg-customColor text-center mx-8">
          {label}
        </div>
        <div className="">
          <p>{new Date(exchangeTime).toISOString().split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default PartInfo;
