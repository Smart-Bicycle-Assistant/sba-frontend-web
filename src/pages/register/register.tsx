import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import NavBar from "../../components/common/Navbar";

import { registerApi } from "../../apis/index";
import useInput from "../../hooks/useInput";

function RegisterPage() {
  const navigate = useNavigate();
  const { value: id, onChange: onIdChange } = useInput();
  const { value: password, onChange: onPasswordChange } = useInput();
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

      <div>
        <div>
          <p>이름</p>
          <input value={nickname} onChange={onNameChange} />
        </div>
        <div>
          <p>아이디</p>
          <input value={id} onChange={onIdChange} />
        </div>
        <div>
          <p>비밀번호</p>
          <input type="password" value={password} onChange={onPasswordChange} />
        </div>
        <div>
          <p>이메일</p>
          <input value={email} onChange={onEmailChange} />
        </div>
      </div>
      <div>
        <a href="/login">로그인</a>
      </div>
      <div>
        <button onClick={onSubmit}>회원가입</button>
      </div>
      <NavBar />
    </div>
  );
}

export default RegisterPage;