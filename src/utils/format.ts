export const formatDuration = (duration: number, divisor: number, unit: string) => {
  return `${Math.round((duration / divisor) * 100) / 100}${unit}`;
};

export const formatToTwoDecimals = (number: number) => {
  return Math.round(number * 100) / 100;
};

export const formatSpeed = (speed: number) => {
  return speed * 3.6;
};
