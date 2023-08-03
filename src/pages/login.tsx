import useInput from "../hooks/useInput";
import { loginApi } from "../apis";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { value: id, onChange: onIdChange } = useInput();
  const { value: password, onChange: onPasswordChange } = useInput();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (id === "" || password === "") {
      return;
    }
    const res = await loginApi({ id, password });
    if (res.status === 200) {
      navigate("/");
      console.log(res);
    }
  };

  return (
    <div>
      <div>
        <p>아이디</p>
        <input value={id} onChange={onIdChange} />
      </div>
      <div>
        <p>비밀번호</p>
        <input type="password" value={password} onChange={onPasswordChange} />
      </div>
      <div>
        <a href="/register">회원가입</a>
      </div>
      <div>
        <button onClick={onSubmit}>로그인</button>
      </div>
    </div>
  );
}

export default LoginPage;
