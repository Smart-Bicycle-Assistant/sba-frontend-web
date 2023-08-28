import useInput from "../hooks/useInput";
import Header from "../components/common/Header";
import { loginApi } from "../apis/index";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { value: id, onChange: onIdChange, setValue: setId } = useInput();
  const {
    value: password,
    onChange: onPasswordChange,
    setValue: setPassword,
  } = useInput();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (id === "" || password === "") {
      return;
    }
    
    try {
      const res = await loginApi({ id, password });
      if (res.status === 200) {
        navigate("/");
        console.log(res);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setId("");
      setPassword("");
    }
  };

  return (
    <div>
      <Header menu="로그인" showBackArrow={true} />
      <div className="px-8 mx-auto">
        <div className="my-10">
          <input
            placeholder="아이디"
            className="w-full text-xs placeholder-slate-400 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={id}
            onChange={onIdChange}
          />

          <input
            placeholder="비밀번호"
            className="w-full text-xs placeholder-slate-400 mt-4 bg-gray-100 rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <button
          className="bg-customColor w-full font-medium text-sm text-white py-2.5 px-4 rounded-lg hover:bg-opacity-80"
          onClick={onSubmit}
        >
          로그인
        </button>
        <div className="mt-10 text-[11px] justify-between flex text-gray-500">
          <a href="/register">{"회원가입 > "}</a>
          <a href="/register">아이디 찾기 | 비밀번호 찾기</a>
        </div>
        <div></div>
      </div>
      <div className=" text-[10px] fixed bottom-0 p-8 mx-auto text-gray-400">
        로그인 완료 시 SBA 앱에 ‘자동 로그인'됩니다. 본인 기기가 아니거나 여러
        사람이 사용중인 기기인 경우 로그아웃을 해주세요.
      </div>
    </div>
    // </div>
  );
}

export default LoginPage;
