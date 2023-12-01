import { useNavigate } from "react-router-dom";
import Header from "../../../components/common/Header";
import useInput from "../../../hooks/useInput";
import { SetStateAction, useState } from "react";
import { RegisterApi, ValidIdApi } from "../../../apis/user";
import useValidate from "../../../components/register/ValidationMessage";

function RegisterPage() {
  const navigate = useNavigate();
  const { value: id, onChange: onIdChange } = useInput();
  const { value: password, onChange: onPasswordChange } = useInput();
  const { value: check, onChange: onCheckChange } = useInput();
  const { value: nickname, onChange: onNameChange } = useInput();
  const { value: emailId, onChange: onEmailIdChange } = useInput();
  const [validationId, setValidationId] = useState(false);

  const [emailOption, setEmailOption] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const { message: idMessage, state: idState } = useValidate({
    value: id,
    type: "id",
  });
  const { message: pwMessage, state: pwState } = useValidate({
    value: password,
    type: "password",
  });
  const { message: pwCheckMessage, state: pwCheckState } = useValidate({
    value: check,
    type: "passwordCheck",
    passwordCheck: password,
  });

  const onEmailOptionChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    const selectedOption = e.target.value;
    setEmailOption(selectedOption);

    if (selectedOption === "직접 입력") {
      setEmailAddress("");
    } else {
      setEmailAddress(selectedOption);
    }
  };

  const isFormInvalid = (
    idState: 0 | 1 | 2,
    pwState: 0 | 1 | 2,
    pwCheckState: 0 | 1 | 2,
    nickname: string,
    emailId: string,
    emailAddress: string
  ): boolean => {
    const values = [
      idState,
      pwState,
      pwCheckState,
      nickname,
      emailId,
      emailAddress,
    ];
    return !(
      values.every((value) => value !== "") &&
      idState === 1 &&
      pwState === 1 &&
      pwCheckState === 1
    );
  };

  const onSubmit = async () => {
    const res = await RegisterApi({
      id,
      nickname,
      password,
      email: `${emailId}@${emailAddress}`,
    });
    console.log(res);
    if (res.status === 200) {
      console.log("회원가입 성공");
      navigate("/register/success", { state: id });
    }
    console.log(res);
  };

  return (
    <div>
      <Header menu="회원가입" showBackArrow={true} />
      <div className="px-4 py-7">
        <div>
          <p className="text-sm text-gray-500">아이디</p>
          <div className="flex gap-2">
            <input
              className="w-8/12 h-12 px-3 py-1 my-1 text-sm bg-gray-100 rounded-lg placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={id}
              placeholder="아이디"
              onChange={onIdChange}
              disabled={validationId}
            />
            <button
              className={`w-4/12 my-1 h-12 text-sm rounded-lg py-1 px-3 ${
                id !== "" && validationId === false
                  ? "bg-primary-default text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
              onClick={async () => {
                const result = await ValidIdApi(id);
                console.log(result);
                result.message == "OK"
                  ? setValidationId(true)
                  : setValidationId(false);
              }}
            >
              {validationId == true ? "확인완료" : "중복확인"}
            </button>
          </div>
          <p
            className={`text-[10px] mb-2 pl-2 ${
              idState === 0
                ? "text-gray-500"
                : idState === 1
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            {idMessage}
          </p>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-500">비밀번호</p>
          <div className="mb-1">
            <input
              className="w-full h-12 px-3 py-3 my-1 text-sm bg-gray-100 rounded-lg placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              placeholder="비밀번호"
              type="password"
              onChange={onPasswordChange}
            />
            <p
              className={`text-[10px] mb-2 pl-2 ${
                pwState === 0
                  ? "text-gray-500"
                  : idState === 1
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {pwMessage}
            </p>
            <input
              className="w-full h-12 px-3 py-3 mb-1 text-sm bg-gray-100 rounded-lg placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={check}
              placeholder="비밀번호 확인"
              type="password"
              onChange={onCheckChange}
            />
            <p
              className={`text-[10px] mb-2 pl-2 ${
                pwCheckState === 0
                  ? "text-gray-500"
                  : idState === 1
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {pwCheckMessage}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-500">닉네임</p>
          <div className="mb-1">
            <input
              className="w-full h-12 px-3 py-3 mt-2 text-sm bg-gray-100 rounded-lg placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nickname}
              placeholder="닉네임"
              onChange={onNameChange}
            />
          </div>
        </div>

        <div className="pt-4 mb-10">
          <p className="text-sm text-gray-500">이메일</p>
          <div className="flex w-full gap-3">
            <input
              className="w-3/5 h-12 px-3 py-1 my-1 text-sm bg-gray-100 rounded-lg placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={emailId}
              placeholder="이메일"
              onChange={onEmailIdChange}
            />
            <p className="h-full pt-3 text-left text-gray-400">@</p>
            {emailOption === "직접 입력" ? (
              <input
                className="w-full h-12 px-3 py-1 my-1 text-sm bg-gray-100 rounded-lg placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailAddress}
                autoFocus={true}
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
              />
            ) : (
              <select
                className={`my-1 w-full h-12 text-sm bg-gray-100 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  emailOption === "" ? "text-gray-400" : "text-black"
                }`}
                value={emailOption}
                onChange={onEmailOptionChange}
              >
                <option value="">선택</option>
                <option value="ajou.ac.kr">ajou.ac.kr</option>
                <option value="naver.com">naver.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="직접 입력">직접 입력</option>
              </select>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <button
          className={`text-white py-2.5 px-4 rounded-lg w-full ${
            isFormInvalid(
              idState,
              pwState,
              pwCheckState,
              nickname,
              emailId,
              emailAddress
            )
              ? "bg-gray-300"
              : "bg-primary-default"
          }`}
          disabled={isFormInvalid(
            idState,
            pwState,
            pwCheckState,
            nickname,
            emailId,
            emailAddress
          )}
          onClick={() => {
            onSubmit();
            navigate("/register/success");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
