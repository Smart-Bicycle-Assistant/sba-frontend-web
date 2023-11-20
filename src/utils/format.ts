export const formatDuration = (duration: number, divisor: number, unit: string) => {
  return `${Math.round((duration / divisor) * 100) / 100}${unit}`;
};

export const formatToTwoDecimals = (number: number) => {
  return Math.round(number * 10) / 10;
};

export const formatSpeed = (speed: number) => {
  return speed * 3.6;
};

export const formatDate = (date: number, option: string) => {
  const ridingTime = new Date(date);

  const year = ridingTime.getFullYear();
  const month = ridingTime.getMonth() + 1;
  const day = ridingTime.getDate();
  const hours = ridingTime.getHours();
  const minutes = ridingTime.getMinutes();

  if (option === 'DEFAULT') {
    return `${year}년 ${month}월 ${day}일`;
  } else if (option === 'DETAIL') {
    return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
  } else {
    return ``;
  }
};
