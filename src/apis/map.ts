import request from './request';
import { handleApiError } from './errorHandling';

export const getBicycleDirectionApi = async (
  startLat: number,
  startLong: number,
  destLat: number,
  destLong: number
) => {
  try {
    const response = await request.get(
      `/riding_location/ors?startLat=${String(startLat)}&startLong=${String(
        startLong
      )}&destLat=${String(destLat)}&destLong=${String(destLong)}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
