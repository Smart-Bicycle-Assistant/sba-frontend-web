import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type InputHookReturnType = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<string>>;
};

const useInput = (defaultValue = ''): InputHookReturnType => {
  const [value, setValue] = useState<string>(defaultValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    []
  );

  return { value, onChange, setValue };
};
export default useInput;
