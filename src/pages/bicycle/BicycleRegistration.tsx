import React, { useState } from "react";
import Header from "../../components/common/Header";
import useInput from "../../hooks/useInput";
import {
  BicycleManagementApi,
  BicycleRegistrationApi,
} from "../../apis/bicycle";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

const compressImage = async (image: File) => {
  try {
    const options = {
      maxSizeMb: 1,
      maxWidthOrHeight: 300,
    };
    return await imageCompression(image, options);
  } catch (e) {
    console.log(e);
  }
};

const encodeFileToBase64 = (image: File) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    const compressedImage = await compressImage(image);
    if (compressedImage) {
      reader.readAsDataURL(compressedImage);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onload = (event: any) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
    }
  });
};

const BicycleRegistration: React.FC = () => {
  const { value: name, onChange: onNameChange, setValue: setName } = useInput();

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [frontLifeSpan, setFrontLifeSpan] = useState<number | null>(null);
  const [rearLifeSpan, setRearLifeSpan] = useState<number | null>(null);

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
    if (
      name === "" ||
      image === null ||
      frontLifeSpan === null ||
      rearLifeSpan === null
    ) {
      return;
    }

    const res = await BicycleRegistrationApi({
      name,
      image: previewImage,
      registerTime: Date.now(),
    });
    const bicycleId = res.message;

    const tireRes =
      res.status === 200 &&
      (await BicycleManagementApi({
        bicycleId: Number(bicycleId),
        frontTire: 2,
        rearTire: 2,
        brakes: 2,
        chain: 2,
        gears: 2,
        frontTireLife: frontLifeSpan,
        rearTireLife: rearLifeSpan,
        managementTime: Date.now(),
      }));
    console.log(tireRes);

    if (tireRes.status === 200) {
      navigate("/bicycle");
      setName("");
    }
  };

  return (
    <div>
      <Header menu="새 자전거 등록" showBackArrow={true} />
      <div className="max-w-md p-5 ">
        <div className="relative h-24 py-5 m-3 bg-white border-2 border-gray-100 rounded-lg">
          <p className="ml-5 text-sm font-semibold text-black">자전거 이름</p>
          <div className="absolute m-3 right-3 bottom-2">
            <input
              className="w-20 pr-2 text-lg font-semibold text-right text-black placeholder-gray-200 bg-transparent border-b border-gray-300 "
              type="text"
              onChange={onNameChange}
            ></input>
          </div>
        </div>

        <div className="relative h-24 py-5 m-3 bg-white border-2 border-gray-100 rounded-lg">
          <p className="ml-5 text-sm font-semibold text-black">
            앞타이어 기대수명
          </p>
          <div className="absolute m-3 right-3 bottom-2">
            <input
              className="w-16 mr-2 text-lg font-bold text-right text-black placeholder-gray-200 bg-transparent border-b border-gray-300"
              value={frontLifeSpan !== null ? frontLifeSpan : ""}
              type="number"
              placeholder="500"
              onChange={(e) => {
                const inputValue = Number(e.target.value);
                if (inputValue >= 0) {
                  setFrontLifeSpan(inputValue);
                }
              }}
            ></input>
            <span className="font-bold text-black text-md">km</span>
          </div>
        </div>

        <div className="relative h-24 py-5 m-3 bg-white border-2 border-gray-100 rounded-lg">
          <p className="ml-5 text-sm font-semibold text-black">
            뒷타이어 기대수명
          </p>
          <div className="absolute m-3 right-3 bottom-2">
            <input
              className="w-16 mr-2 text-lg font-bold text-right text-black placeholder-gray-200 bg-transparent border-b border-gray-300"
              value={rearLifeSpan !== null ? rearLifeSpan : ""}
              type="number"
              placeholder="500"
              onChange={(e) => {
                setRearLifeSpan(Number(e.target.value));
              }}
            ></input>
            <span className="font-bold text-black text-md">km</span>
          </div>
        </div>

        <div className="relative h-24 py-5 m-3 bg-white border-2 border-gray-100 rounded-lg">
          <div className="pr-4 mb-6 ">
            <p className="ml-5 text-sm font-semibold text-black">
              자전거 이미지
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              required
              className="w-full m-3 ml-5 text-xs bg-transparent rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={onSubmit}
            className="text-sm w-full bg-primary-default text-white py-2.5 mt-5 rounded-lg hover:bg-opacity-80 shadow-md"
          >
            새 자전거 등록
          </button>
        </div>
      </div>
      <div className="text-[10px] relative bottom-[-40px] p-8 mx-auto text-gray-400">
        등록한 자전거는 내 자전거 리스트에 표시됩니다.
      </div>
    </div>
  );
};

export default BicycleRegistration;
