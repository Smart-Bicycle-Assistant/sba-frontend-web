import { useState, Dispatch, SetStateAction } from 'react';
import useInput from '../../hooks/useInput';
import { useLocationStore } from '../../store/locationStore';
import { keywordSearch, getAddr } from '../../utils/map';
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

  const { latitude, longitude } = useLocationStore();

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
            road_address_name: el.road_address_name,
            address_name: el.address_name,
          }))
        );
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const getCurrentLocation = () => {
    getAddr(latitude, longitude)
      .then((result) => {
        console.log(result);
        setStartCoord([longitude, latitude]);
        setStartInput(result);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  return (
    <form className="flex flex-col gap-y-2 pb-4" onSubmit={(e) => getDirections(e)}>
      <div className="flex items-center w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <input
          placeholder="출발지"
          className="w-[90%] text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3"
          value={startInput}
          onClick={() => setSearchPageFull('START')}
          onChange={(e) => {
            onStartInput(e);
            inputHandler(startInput, setStartSearchList);
          }}
        />
        <button className="w-[10%] flex justify-end pr-3" onClick={getCurrentLocation}>
          <span className="material-symbols-outlined text-xl text-slate-400">
            location_searching
          </span>
        </button>
      </div>
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
              <div>
                <p className="font-semibold pb-0.5">{el.label}</p>
                {el.road_address_name !== ('' && null && undefined) ? (
                  <p className="text-slate-500">{el.road_address_name}</p>
                ) : (
                  <p className="text-slate-500">{el.address_name}</p>
                )}
              </div>
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
              <div>
                <p className="font-semibold pb-0.5">{el.label}</p>
                {el.road_address_name !== ('' && null && undefined) ? (
                  <p className="text-slate-500">{el.road_address_name}</p>
                ) : (
                  <p className="text-slate-500">{el.address_name}</p>
                )}
              </div>
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
