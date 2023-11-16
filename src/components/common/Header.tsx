import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  menu: string;
  showBackArrow?: boolean;
};

const Header: React.FC<HeaderProps> = ({ menu, showBackArrow = false }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="text-black text-lg text-center border-b-2 p-2 font-bold">
        {showBackArrow && (
          <span className="absolute left-2" onClick={onClickBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </span>
        )}
        {menu}
      </div>
    </div>
  );
};

export default Header;
