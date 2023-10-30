import { PackRidingType } from "../types";
import request from "./request";

export const RidingLocationApi = async (params: PackRidingType) => {
  try {
    const response = await request.get(
      `/riding_location/post_and_get?memberId=${params.id}&longitude=${params.longitude}&latitude=${params.latitude}&packMode=${params.packMode}&speed=${params.speed}`
    );
    return response.data;
  } catch (error) {
    console.error("에러 발생: ", error);
    return { error: error.message };
  }
};
