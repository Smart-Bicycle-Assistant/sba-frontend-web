import { formatDate } from '../../utils/format';

interface PartInfoProps {
  label: string;
  exchangeTime: number;
}

const PartInfo: React.FC<PartInfoProps> = ({ label, exchangeTime }) => {
  return (
    <div className="flex flex-col w-full text-sm gap-y-4">
      <div className="flex items-center gap-x-3">
        <div className="w-[75px] px-3 py-1 rounded-lg bg-primary-200 text-center">
          <p className="text-primary-default">{label}</p>
        </div>
        <div>
          <p>{formatDate(exchangeTime, 'DEFAULT')}</p>
        </div>
      </div>
    </div>
  );
};

export default PartInfo;
