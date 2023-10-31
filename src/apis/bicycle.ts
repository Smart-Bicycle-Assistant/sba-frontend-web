import request from "./request";
import { useUser } from "../store/userStore";
import { handleApiError } from "./errorHandling";

export type BicycleRegistrationType = {
  name: string;
  image: File;
};

export const BicycleRegistrationApi = async ({
  name,
  image,
}: BicycleRegistrationType) => {
  const { id } = useUser.getState();
  try {
    const response = await request.post("/member/register_bicycle", {
      id,
      name,
      image,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
