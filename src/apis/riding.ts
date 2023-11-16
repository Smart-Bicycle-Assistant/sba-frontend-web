import { PackRidingType } from '../types';
import { handleApiError } from './errorHandling';
import request from './request';
import { useUser } from '../store/userStore';

export type RidingRecordType = {
  ridingTime: string;
  distance: number;
  maxSpeed: number;
  ridingDuration: number;
};

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

export const startRidingApi = async () => {
  const id = useUser.getState().id;
  try {
    const response = await request.get(`/riding_location/startRiding?memberId=${id}`);
    return response.status;
  } catch (error) {
    return handleApiError(error);
  }
};

export const postRidingRecordApi = async ({
  ridingTime,
  distance,
  maxSpeed,
  ridingDuration,
}: RidingRecordType) => {
  try {
    const response = await request.post('/riding_record/post', {
      memberId: useUser.getState().id,
      bicycleId: 25,
      ridingTime: Number(ridingTime),
      distance: distance,
      avgSpeed: 30,
      maxSpeed: maxSpeed,
      ridingDuration: Number(ridingDuration),
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
