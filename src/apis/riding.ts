import { PackRidingType } from '../types';
import { handleApiError } from './errorHandling';
import { useMainBike } from '../store/userStore';
import request from './request';

export type RidingRecordType = {
  ridingTime: string;
  distance: number;
  maxSpeed: number;
  ridingDuration: number;
};

export const RidingLocationApi = async (params: PackRidingType) => {
  try {
    const response = await request.get(
      `/riding_location/post_and_get?longitude=${params.longitude}&latitude=${params.latitude}&packMode=${params.packMode}&targetSpeed=${params.targetSpeed}&curSpeed=${params.curSpeed}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const startRidingApi = async () => {
  try {
    const response = await request.get(`/riding_location/startRiding`);
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
      bicycleId: useMainBike.getState().main,
      ridingTime: Number(ridingTime),
      distance: distance,
      avgSpeed: distance / Number(ridingDuration),
      maxSpeed: maxSpeed,
      ridingDuration: Number(ridingDuration),
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
