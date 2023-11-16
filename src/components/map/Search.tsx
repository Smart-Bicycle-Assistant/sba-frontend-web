import { useState, Dispatch, SetStateAction } from 'react';
import useInput from '../../hooks/useInput';
import { keywordSearch } from '../../utils/map';
import { AddressType } from '../../types';

type SearchPageType = 'DEFAULT' | 'START' | 'END';

type SearchResultType = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type SearchProps = {
  getDirections: (e: React.FormEvent) => void;
  setStartCoord: React.Dispatch<React.SetStateAction<[number, number] | undefined>>;
  setEndCoord: React.Dispatch<React.SetStateAction<[number, number] | undefined>>;
};

const Search: React.FC<SearchProps> = ({ getDirections, setStartCoord, setEndCoord }) => {
  const [searchPageFull, setSearchPageFull] = useState<SearchPageType>('DEFAULT');
  const [startSearchList, setStartSearchList] = useState<AddressType[]>([]);
  const [endSearchList, setEndSearchList] = useState<AddressType[]>([]);

  const { value: startInput, onChange: onStartInput, setValue: setStartInput } = useInput();
  const { value: endInput, onChange: onEndInput, setValue: setEndInput } = useInput();

  const inputHandler = async (
    input: string,
    setSearchList: Dispatch<SetStateAction<AddressType[]>>
  ) => {
    keywordSearch<SearchResultType>(input)
      .then((result: SearchResultType[]) => {
        console.log(result);
        setSearchList(
          result.map((el) => ({
            label: el.place_name,
            x: Number(el.x),
            y: Number(el.y),
          }))
        );
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  return (
    <form className="flex flex-col gap-y-2 pb-4" onSubmit={(e) => getDirections(e)}>
      <input
        placeholder="출발지"
        className="w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={startInput}
        onClick={() => setSearchPageFull('START')}
        onChange={(e) => {
          onStartInput(e);
          inputHandler(startInput, setStartSearchList);
        }}
      />
      {searchPageFull === 'START' && startSearchList.length > 0 && (
        <div className="flex flex-col gap-y-2 rounded-lg overflow-auto">
          {startSearchList.map((el, index) => (
            <div
              key={index}
              className="px-3 py-3 bg-gray-100 rounded-lg text-xs hover:bg-gray-200"
              onClick={() => {
                setStartInput(el.label);
                setStartCoord([el.x, el.y]);
                setStartSearchList([]);
                setSearchPageFull('DEFAULT');
              }}
            >
              {el.label}
            </div>
          ))}
        </div>
      )}
      <input
        placeholder="도착지"
        className="w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={endInput}
        onClick={() => setSearchPageFull('END')}
        onChange={(e) => {
          onEndInput(e);
          inputHandler(endInput, setEndSearchList);
        }}
      />
      {searchPageFull === 'END' && endSearchList.length > 0 && (
        <div className="flex flex-col gap-y-2 rounded-lg overflow-auto">
          {endSearchList.map((el, index) => (
            <div
              key={index}
              className="px-3 py-3 bg-gray-100 rounded-lg text-xs hover:bg-gray-200"
              onClick={() => {
                setEndInput(el.label);
                setEndCoord([el.x, el.y]);
                setEndSearchList([]);
                setSearchPageFull('DEFAULT');
              }}
            >
              {el.label}
            </div>
          ))}
        </div>
      )}
      <input
        type="submit"
        className="bg-primary-default w-full font-medium text-sm text-white py-2.5 px-4 rounded-lg hover:bg-opacity-80"
        value="검색"
      ></input>
    </form>
  );
};

export default Search;
