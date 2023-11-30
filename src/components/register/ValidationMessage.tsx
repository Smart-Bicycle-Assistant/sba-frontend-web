import { useEffect, useState } from "react";

type validState = 0 | 1 | 2;
// "initial" | "valid" | "invalid";

const useValidate = ({
  value,
  type,
  passwordCheck,
}: {
  value: string;
  type: string;
  passwordCheck?: string;
}) => {
  const [state, setState] = useState<validState>(0);

  useEffect(() => {
    const validate = () => {
      switch (type) {
        case "id":
          if (!value) {
            setState(0);
          } else if (/^[a-z0-9]{4,12}$/.test(value)) {
            setState(1);
          } else {
            setState(2);
          }
          break;
        case "password":
          // eslint-disable-next-line no-case-declarations
          const passwordRegex =
            /^[A-Za-z0-9`~!@#$%^&*(){}[\]\-_=\\+\\|;:'"<>,\\./\\?]{8,20}$/;
          if (!value) {
            setState(0);
          } else if (passwordRegex.test(value)) {
            setState(1);
          } else {
            setState(2);
          }
          break;

        case "passwordCheck":
          if (!value) {
            setState(0);
          } else if (value === passwordCheck) {
            setState(1);
          } else {
            setState(2);
          }
          break;
        default:
          setState(0);
          break;
      }
    };

    validate();
  }, [value, type, passwordCheck]);

  let message = "";
  // let colorClass = "";

  switch (state) {
    case 1:
      switch (type) {
        case "id":
          message = "";
          break;
        case "password":
          message = "사용 가능한 비밀번호입니다.";
          break;
        case "passwordCheck":
          message = "비밀번호가 일치합니다.";
          break;
        default:
          message = "유효한 형식입니다.";
          break;
      }
      // colorClass = "text-blue-500";
      break;
    case 2:
      switch (type) {
        case "id":
          message =
            "영문 소문자와 숫자만 사용하여, 영문 소문자로 시작하는 4~12자의 아이디를 입력해주세요.";
          break;
        case "password":
          message = "영문, 숫자, 특수문자를 사용하여 8~20자로 입력해주세요.";
          break;
        case "passwordCheck":
          message = "비밀번호가 일치하지 않습니다.";
          break;
        default:
          message = "유효하지 않은 형식입니다.";
          break;
      }
      // colorClass = "text-red-500";
      break;
    default:
      switch (type) {
        case "id":
          message = "4~12자/영문 소문자(숫자 조합 가능)";
          break;
        case "password":
          message = "8~20자/영문, 숫자, 특수문자 조합 가능";
          break;
        case "passwordCheck":
          message = "";
          break;
        default:
          message = "형식 안내";
          break;
      }
      // colorClass = "text-gray-500";
      break;
  }
  // const Message: React.FC = () => {
  //   return <p className={`text-[10px] mb-2 pl-2 ${colorClass}`}>{message}</p>;
  // };

  return {
    message: message,
    state: state,
  };
};

export default useValidate;
