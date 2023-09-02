const SERVER_API = import.meta.env.VITE_SERVER_API;

//BicycleMain //전체 자전거 목록

//BicycleDetail //자전거 하나 상세정보

//BicycleRegistration

export type BicycleRegistrationType = {
  name: string;
  image: File;
};

export const BicycleRegistratrationApi = async ({
  name,
  image,
}: BicycleRegistrationType) => {
  const res = await fetch(SERVER_API + "/register_bicycle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      image,
    }),
  });
  const { data, message } = await res.json();
  console.log("data : ", data, "message: ", message);
  return { data, status: res.status };
};
