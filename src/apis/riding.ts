import { PackRidingType } from '../types';
import { handleApiError } from './errorHandling';
import request from './request';

export const RidingLocationApi = async (params: PackRidingType) => {
  try {
    const response = await request.get(
      `/riding_location/post_and_get?longitude=${params.longitude}&latitude=${params.latitude}&packMode=${params.packMode}&speed=${params.speed}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
