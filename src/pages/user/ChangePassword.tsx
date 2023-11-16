import { useState } from 'react';
import { ChangePasswordApi } from '../../apis/user';
import Header from '../../components/common/Header';
import { useNavigate } from 'react-router-dom';

export const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    newPassword: '',
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await ChangePasswordApi(formData);
    console.log(response);
    if (response.status == 200) {
      alert('비밀번호가 변경되었습니다.');
      navigate('/');
    } else {
      alert(response.message);
    }
  };
  return (
    <div>
      <Header menu="비밀번호 변경" showBackArrow={true} />
      <div className="px-6 mx-3 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label className="block mb-2 text-sm text-gray-600">아이디</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md placeholder-slate-400"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div className="py-4">
            <label className="block mb-2 text-sm text-gray-600">현재 비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md placeholder-slate-400"
              placeholder="현재 비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="py-4">
            <label className="block mb-2 text-sm text-gray-600">새로운 비밀번호</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md placeholder-slate-400"
              placeholder="새로운 비밀번호를 입력하세요"
              required
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4">
            <button
              className="text-white py-2.5 px-4 rounded-lg w-full bg-customColor"
              type="submit"
            >
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
