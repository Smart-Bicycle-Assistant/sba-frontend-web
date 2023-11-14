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
    const response = await request.post("/management_record/register_bicycle", {
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
  bicycleId: number;
  frontTire: number;
  rearTire: number;
  brakes: number;
  chain: number;
  gears: number;
  frontTireLife: number;
  rearTireLife: number;
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

export const GetBicycleListApi = async () => {
  try {
    const response = await request.get("management_record/get_bicycle_list");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const GetManagementListApi = async (bicycleNo: number) => {
  try {
    const response = await request.get(
      `/management_record/whole_list?bicycleId=${bicycleNo}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const BicycleManageListApi = async (bicycleNo: number) => {
  try {
    const response = await request.get(
      `/management_record/whole_list?bicycleId=${bicycleNo}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
