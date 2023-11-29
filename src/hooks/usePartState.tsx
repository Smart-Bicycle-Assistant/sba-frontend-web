import { useState } from 'react';

type PartStateHookReturnType = {
  replace: boolean;
  check: boolean;
  toggleReplace: () => void;
  toggleCheck: () => void;
};
const usePartState = (): PartStateHookReturnType => {
  const [replace, setReplace] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const toggleReplace = () => {
    setCheck(false);
    setReplace((prev) => !prev);
  };
  const toggleCheck = () => {
    setReplace(false);
    setCheck((prev) => !prev);
  };

  return { replace, check, toggleReplace, toggleCheck };
};

export default usePartState;
