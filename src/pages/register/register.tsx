import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import { registerApi } from "../../apis/index";
import useInput from "../../hooks/useInput";
import ValidationMessage from "../../components/register/ValidationMessage";

function RegisterPage() {
  const navigate = useNavigate();
  const { value: id, onChange: onIdChange } = useInput();
  const { value: password, onChange: onPasswordChange } = useInput();
  const { value: check, onChange: onCheckChange } = useInput();
  const { value: nickname, onChange: onNameChange } = useInput();
  const { value: email, onChange: onEmailChange } = useInput();

  const onSubmit = async () => {
    if (id === "" || password === "" || nickname === "" || email === "") {
      return;
    }
    const res = await registerApi({ id, nickname, password, email });
    if (res.status === 200) {
      navigate("/login");
    }
    console.log(res);
  };

  // const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") onSubmit();
  // };

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
            />
            <button className=" w-4/12 my-1 h-12 text-sm bg-gray-200 rounded-lg py-1 px-3 text-gray-500">
              중복확인
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
          <div className="flex gap-2">
            <input
              className=" w-7/12 my-1 h-12 text-sm placeholder-slate-300 bg-gray-100 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              placeholder="이메일"
              onChange={onEmailChange}
            />
            <p className=" text-gray-400 h-full text-left pt-3">@</p>
            <select
              className="w-5/12 my-1 h-12 text-sm text-gray-300 bg-gray-100 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={() => {}}
            >
              <option value="">선택</option>
              <option value="google.com">google.com</option>
              <option value="naver.com">naver.com</option>
              <option value="kakao.com">kakao.com</option>
              <option value="ajou.ac.kr">ajou.ac.kr</option>
            </select>
          </div>
          <ValidationMessage value={email} type="email" />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <button
          className="bg-customColor text-white py-2.5 px-4 rounded-lg w-full"
          onClick={() => {}}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
