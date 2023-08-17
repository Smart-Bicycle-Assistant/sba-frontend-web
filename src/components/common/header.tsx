type HeaderProps = {
  menu: string;
};

const header: React.FC<HeaderProps> = ({ menu }) => {
  return (
    <div>
      <div className="text-black text-lg text-center border-b-2 p-2 font-bold">
        {menu}
      </div>
    </div>
  );
};

export default header;
