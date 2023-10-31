import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import useInput from "../../hooks/useInput";
import ValidationMessage from "../../components/register/ValidationMessage";
import { SetStateAction, useState } from "react";
import { RegisterApi, ValidIdApi } from "../../apis/user";

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
    id: string,
    password: string,
    nickname: string,
    emailId: string,
    emailAddress: string
  ): boolean => {
    const values = [id, password, nickname, emailId, emailAddress];
    return values.some((value) => value === "");
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
          <p className="text-gray-500 text-sm">아이디</p>
          <div className="flex gap-2">
            <input
              className=" w-8/12 my-1 h-12 text-sm placeholder-slate-300 bg-gray-100 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={id}
              placeholder="아이디"
              onChange={onIdChange}
              disabled={validationId}
            />
            <button
              className={`w-4/12 my-1 h-12 text-sm rounded-lg py-1 px-3 ${
                id !== "" && validationId === false
                  ? "bg-customColor text-white"
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
          <ValidationMessage value={id} type="id" />
        </div>

        <div className="pt-4">
          <p className="text-gray-500 text-sm">비밀번호</p>
          <div className="mb-1">
            <input
              className=" w-full my-1 h-12 text-sm placeholder-slate-300 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              placeholder="비밀번호"
              type="password"
              onChange={onPasswordChange}
            />
            <ValidationMessage value={password} type="password" />
            <input
              className=" w-full h-12 text-sm mb-1 placeholder-slate-300 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={check}
              placeholder="비밀번호 확인"
              type="password"
              onChange={onCheckChange}
            />
            <ValidationMessage
              value={check}
              passwordCheck={password}
              type="passwordCheck"
            />
          </div>
        </div>

        <div className="pt-4">
          <p className="text-gray-500 text-sm">닉네임</p>
          <div className="mb-1">
            <input
              className=" w-full mt-2 h-12 text-sm placeholder-slate-300 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nickname}
              placeholder="닉네임"
              onChange={onNameChange}
            />
          </div>
        </div>

        <div className="pt-4">
          <p className="text-gray-500 text-sm">이메일</p>
          <div className="flex gap-3 w-full">
            <input
              className="w-3/5 my-1 h-12 text-sm placeholder-slate-300 bg-gray-100 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={emailId}
              placeholder="이메일"
              onChange={onEmailIdChange}
            />
            <p className="text-gray-400 h-full text-left pt-3">@</p>
            {emailOption === "직접 입력" ? (
              <input
                className="my-1 w-full h-12 text-sm placeholder-slate-300 bg-gray-100 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <option value="google.com">google.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="직접 입력">직접 입력</option>
              </select>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <button
          className={` text-white py-2.5 px-4 rounded-lg w-full ${
            isFormInvalid(id, password, nickname, emailId, emailAddress)
              ? "bg-gray-300"
              : "bg-customColor"
          }`}
          disabled={isFormInvalid(
            id,
            password,
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
