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



export type BicycleType = {
  bicycleId: number;
  bicycleImage: string;
  bicycleName: string;
  distance: number;
  registerTime: number;
};

export type AddressType = {
  label: string;
  x: number;
  y: number;
};

export type StepType = {
  distance: number;
  duration: number;
  instruction: string;
  name: string;
  type: number;
  way_points: number[];
};

export type RouteType = {
  distance: number;
  step: StepType[];
  geometry: [number, number][];
};

export type LoginType = {
  id: string;
  password: string;
};

export type RegisterType = LoginType & {
  nickname: string;
  email: string;
};

export type PackRidingType = {
  longitude: number;
  latitude: number;
  packMode: boolean;
  targetSpeed: number | null;
  curSpeed: number | null;
};

export interface Bicycle {
  bicycleId: number;
  bicycleName: string;
  bicycleImage: string;
  registerTime: number;
  distance: number;
}

export type BicycleCardProps = {
  bicycleId: number;
  name: string;
  registrationDate: Date;
  image: string;
};

export interface ManagementStatus {
  managementTime: number;
  numFixed: number;
  recordId: number;
}
export interface BicycleStatus {
  bicycleName: string;
  brakeExchangeTime: number;
  chainExchangeTime: number;
  frontTireExchangeTime: number;
  frontTireLeftLife: string;
  gearExchangeTime: number;
  rearTireExchangeTime: number;
  rearTireLeftLife: string;
}
