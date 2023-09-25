import React, { useEffect, useState } from "react";

type ValidationMessage = "initial" | "valid" | "invalid";

interface ValidationProps {
  value: string;
  type: "id" | "password" | "passwordCheck";
  passwordCheck?: string;
}

const ValidationMessage: React.FC<ValidationProps> = ({
  value,
  type,
  passwordCheck,
}) => {
  const [validationMessage, setValidationMessage] =
    useState<ValidationMessage>("initial");

  useEffect(() => {
    const validate = () => {
      switch (type) {
        case "id":
          if (!value) {
            setValidationMessage("initial");
          } else if (/^[a-z0-9]{4,12}$/.test(value)) {
            setValidationMessage("valid");
          } else {
            setValidationMessage("invalid");
          }
          break;
        case "password":
          // eslint-disable-next-line no-case-declarations
          const passwordRegex =
            /^[A-Za-z0-9`~!@#$%^&*(){}[\]\-_=\\+\\|;:'"<>,\\./\\?]{8,20}$/;
          if (!value) {
            setValidationMessage("initial");
          } else if (passwordRegex.test(value)) {
            setValidationMessage("valid");
          } else {
            setValidationMessage("invalid");
          }
          break;

        case "passwordCheck":
          if (!value) {
            setValidationMessage("initial");
          } else if (value === passwordCheck) {
            setValidationMessage("valid");
          } else {
            setValidationMessage("invalid");
          }
          break;
        default:
          setValidationMessage("initial");
          break;
      }
    };

    validate();
  }, [value, type, passwordCheck]);

  let message = "";
  let colorClass = "";

  switch (validationMessage) {
    case "valid":
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
      colorClass = "text-blue-500";
      break;
    case "invalid":
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
      colorClass = "text-red-500";
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
      colorClass = "text-gray-500";
      break;
  }

  return <p className={`text-[10px] mb-2 pl-2 ${colorClass}`}>{message}</p>;
};

export default ValidationMessage;
