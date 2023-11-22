declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const places = new window.kakao.maps.services.Places();
const geocoder = new window.kakao.maps.services.Geocoder();

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

export const getAddr = (lat: number, lng: number): Promise<string> => {
  const coord = new window.kakao.maps.LatLng(lat, lng);

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const arr = { ...result };
        if (arr[0].road_address !== null) {
          const _arr = arr[0].road_address.address_name;
          resolve(_arr);
        } else {
          const _arr = arr[0].address.address_name;
          resolve(_arr);
        }
      } else {
        reject(status);
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
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
