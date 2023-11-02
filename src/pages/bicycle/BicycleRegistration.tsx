import React, { useState } from "react";
import Header from "../../components/common/Header";
import useInput from "../../hooks/useInput";
import { BicycleRegistrationApi } from "../../apis/bicycle";
import { useNavigate } from "react-router-dom";

const encodeFileToBase64 = (image: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = (event: any) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
  });
};

const BicycleRegistration: React.FC = () => {
  const { value: name, onChange: onNameChange, setValue: setName } = useInput();

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [frontLifeSpan, setFrontLifeSpan] = useState<number | null>();
  const [rearLifeSpan, setRearLifeSpan] = useState<number | null>();

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const base64Image = (await encodeFileToBase64(selectedImage)) as string;
      setPreviewImage(base64Image);
    }
  };
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "" || image === null) {
      return;
    }

    const res = await BicycleRegistrationApi({ name, image: previewImage });
    navigate("/management/part");
    console.log(res);
    setName("");
  };

  return (
    <div>
      <Header menu="새 자전거 등록" showBackArrow={true} />
      <div className=" p-5 max-w-md">
        <div className="rounded-lg bg-[#4D93FF] shadow-md py-5 relative h-24 m-3">
          <p className="text-white text-sm ml-5 font-semibold">자전거 이름</p>
          <div className="absolute right-3 bottom-2 m-3">
            <input
              className=" bg-transparent border-b w-20 border-[#73AAFF] text-right pr-2 text-white font-semibold text-lg placeholder-[#87b4f8]"
              type="text"
              onChange={onNameChange}
            ></input>
          </div>
        </div>

        <div className="rounded-lg bg-[#4D93FF] shadow-md py-5 relative h-24  m-3">
          <p className="text-white text-sm ml-5 font-semibold">
            앞타이어 기대수명
          </p>
          <div className="absolute right-3 bottom-2 m-3">
            <input
              className="mr-2 bg-transparent border-b w-16 border-[#73AAFF] text-right text-white font-bold text-lg placeholder-[#87b4f8]"
              type="text"
              placeholder="5,000"
              onChange={(e) => {
                setFrontLifeSpan(Number(e.target.value));
              }}
            ></input>
            <span className="text-white text-md font-bold">km</span>
          </div>
        </div>

        <div className="rounded-lg bg-[#4D93FF] shadow-md py-5 relative h-24  m-3">
          <p className="text-white text-sm ml-5 font-semibold">
            뒷타이어 기대수명
          </p>
          <div className="absolute right-3 bottom-2 m-3">
            <input
              className="mr-2 bg-transparent border-b w-16 border-[#73AAFF] text-right text-white font-bold text-lg placeholder-[#87b4f8]"
              type="text"
              placeholder="5,000"
              onChange={(e) => {
                setRearLifeSpan(Number(e.target.value));
              }}
            ></input>
            <span className="text-white text-md font-bold">km</span>
          </div>
        </div>

        <div className="rounded-lg bg-[#4D93FF] shadow-md py-5 relative h-24  m-3">
          <div className=" pr-4 mb-6">
            <p className="text-white text-sm ml-5 font-semibold">
              자전거 이미지
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              required
              className="text-xs w-full m-3 ml-5 rounded-md bg-transparent focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={onSubmit}
            className="text-sm w-full bg-customColor text-white py-2.5 mt-3 rounded-lg hover:bg-opacity-80 "
          >
            다음
          </button>
        </div>
      </div>
      <div className="text-[10px] fixed bottom-0 p-8 mx-auto text-gray-400">
        등록한 자전거는 내 자전거 리스트에 표시됩니다.
      </div>
    </div>
  );
};

export default BicycleRegistration;
