

// Record
export type RecordListType = {
  avgSpeed: number;
  recordId: number;
  ridingDistance: number;
  ridingDuration: number;
  ridingTime: number;
};

export type RecordComponentType = RecordListType & {
  id: number;
  memberId: string;
  bicycleNo: number;
  distance: number;
  maxSpeed: number;
  map: string;
};

//Bicycle
export type BicycleCardProps = {
  name: string;
  registrationDate: string;
  mileage: string;
};
