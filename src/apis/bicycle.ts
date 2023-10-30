const SERVER_API = import.meta.env.VITE_SERVER_API;

export type BicycleRegistrationType = {
  id: string;
  name: string;
  image: File;
};

export const BicycleRegistratrationApi = async ({
  id,
  name,
  image,
}: BicycleRegistrationType) => {
  const res = await fetch(SERVER_API + "/register_bicycle", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify({
      id,
      name,
      image,
    }),
  });
  // const { data, message } = await res.json();
  // console.log("data : ", data, "message: ", message);
  // return { data, status: res.status };
  console.log(res);
};
