import { Link, useNavigate } from "react-router-dom";
import { useMainBike } from "../../store/userStore";
import Compass from "../../assets/compass.svg?react";
import Record from "../../assets/record.svg?react";
import Setting from "../../assets/setting.svg?react";
import User from "../../assets/user.svg?react";
import Home from "../../assets/home.svg?react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { main } = useMainBike();

  const navItems = [
    { to: "/map", label: "주행", icon: <Compass className="w-[90%]" /> },
    {
      onClick: () => {
        console.log(main);
        navigate("/management", { state: main });
      },
      label: "관리",
      icon: <Setting className="w-[90%]" />,
    },
    { to: "/home", label: "홈", icon: <Home className="w-[90%]" /> },
    {
      to: "/mypage/record/all",
      label: "기록",
      icon: <Record className="w-[90%]" />,
    },
    {
      to: "/mypage",
      label: "내 정보",
      icon: <User className="w-[90%]" stroke="#333333" />,
    },
  ];

  return (
    <div className="fixed bottom-0 flex w-full text-sm bg-white h-14 border-t-[1px]">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-1/5 pt-1 pb-1 text-center"
        >
          {item.to ? (
            <Link to={item.to} className="flex flex-col items-center">
              {item.icon}
              <span className="text-[9px] text-gray-600 -mt-1">
                {item.label}
              </span>
            </Link>
          ) : (
            <div onClick={item.onClick} className="flex flex-col items-center">
              {item.icon}
              <span className="text-[9px] text-gray-600 -mt-1">
                {item.label}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
