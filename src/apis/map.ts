export const decodePolyline = (
  encodedPolyline: string,
  includeElevation: boolean
) => {
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
