import React, { useState } from 'react';
import Header from '../../components/common/Header';
import useInput from '../../hooks/useInput';
import { BicycleRegistrationApi } from '../../apis/bicycle';
import { useNavigate } from 'react-router-dom';

const BicycleRegistration: React.FC = () => {
  const { value: name, onChange: onNameChange, setValue: setName } = useInput();

  const id = '1';

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage));
    }
  };
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === '' || image === null) {
      return;
    }
    const res = await BicycleRegistrationApi({ id, name, image });
    navigate('/bicycle');
    console.log(res);

    setName('');
  };

  return (
    <div>
      <Header menu="새 자전거 등록" showBackArrow={true} />
      <div className="mx-auto p-8 max-w-md">
        <div className="mb-6">
          <p className="mb-2 text-sm text-gray-600">자전거 이름</p>
          <input
            value={name}
            onChange={onNameChange}
            className="w-full px-4 py-2 rounded-md bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex">
          <div className="w-3/4 pr-4 mb-6">
            <p className="mb-2 text-sm text-gray-600">자전거 이미지</p>
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              required
              className="text-xs w-full px-4 py-2 rounded-md bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-1/4 pt-7">
            {previewImage && (
              <div className="mb-4">
                <img
                  src={previewImage}
                  alt="자전거 이미지 미리보기"
                  className="w-full rounded-md opacity-80 border-collapse"
                />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="text-sm w-full bg-customColor text-white py-2.5 mt-3 rounded-lg hover:bg-opacity-80"
        >
          새 자전거 등록
        </button>
      </div>
      <div className="text-[10px] fixed bottom-0 p-8 mx-auto text-gray-400">
        등록한 자전거는 내 자전거 리스트에 표시됩니다.
      </div>
    </div>
  );
};

export default BicycleRegistration;
