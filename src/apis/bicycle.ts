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

export type ManagementType = {
  memberId?: string;
  bicycleNo: number;
  tire: number;
  brakes: number;
  chain: number;
  gears: number;
  front_tire: number | null;
  rear_tire: number | null;
  managementTime: number;
};

// - fix 2
// - check 1
// - nothing 0

export const BicycleManagementApi = async (params: ManagementType) => {
  const id = useUser.getState().id || "test2";
  params.memberId = id;
  try {
    const response = await request.post("/management_record/post", params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
