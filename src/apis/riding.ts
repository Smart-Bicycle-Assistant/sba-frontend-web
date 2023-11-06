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

export const postRidingRecordApi = async () => {
  try {
    const response = await request.post('/riding_record/post', {
      memberId: 'test1',
      bicycleNo: '0',
      ridingTime: '4',
      distance: '0.5',
      avgSpeed: '30.5',
      maxSpeed: '45.9',
      ridingDuration: '30',
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
