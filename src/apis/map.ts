import request from './request';
import { handleApiError } from './errorHandling';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const places = new window.kakao.maps.services.Places();

export const keywordSearch = <T>(input: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const callback = (result: T[], status: 'OK' | 'ZERO_RESULT' | 'ERROR') => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(result);
      } else {
        reject(status);
      }
    };

    places.keywordSearch(input, callback);
  });
};

export const decodePolyline = (encodedPolyline: string, includeElevation: boolean) => {
  const points: [number, number][] = [];
  let index = 0;
  const len = encodedPolyline.length;
  let lat = 0;
  let lng = 0;
  let ele = 0;

  while (index < len) {
    let b: number;
    let shift = 0;
    let result = 0;

    do {
      b = encodedPolyline.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    shift = 0;
    result = 0;

    do {
      b = encodedPolyline.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

    if (includeElevation) {
      shift = 0;
      result = 0;

      do {
        b = encodedPolyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      ele += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    }

    try {
      const location: [number, number] = [lat / 1e5, lng / 1e5];

      if (includeElevation) {
        location.push(ele / 100);
      }

      points.push(location);
    } catch (e) {
      console.log(e);
    }
  }

  return points;
};

export const convertMeterToKilometer = (number: number) => {
  return number / 1000;
};

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
