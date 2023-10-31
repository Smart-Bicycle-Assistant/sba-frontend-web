import request from "./request";
import { useUser } from "../store/userStore";
import { handleApiError } from "./errorHandling";

export type BicycleRegistrationType = {
  name: string;
  image: string;
};

export const BicycleRegistrationApi = async ({
  name,
  image,
}: BicycleRegistrationType) => {
  const id = useUser.getState().id || "test2";
  console.log(id);
  try {
    console.log(`id: ${id}, name: ${name}, image: ${image}`);
    const response = await request.post("/member/register_bicycle", {
      ownerId: id,
      bicycleName: name,
      bicycleImage: image,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
